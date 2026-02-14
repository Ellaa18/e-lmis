import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/admin.css";
import { supabase } from "../supabase";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    photo: "",
    code: "",
    documents: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState({});

  // Load users from Supabase
  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await supabase.from("users").select("*").order("created_at");
      setUsers(data || []);

      const slides = {};
      data?.forEach((_, index) => (slides[index] = 0));
      setCurrentSlide(slides);
    };
    loadUsers();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, photo: reader.result });
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "documents") {
      const files = Array.from(e.target.files);
      const readers = files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(readers).then((images) => {
        setFormData({ ...formData, documents: [...formData.documents, ...images] });
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Edit user
    if (editingIndex !== null) {
      const user = users[editingIndex];
      const { data } = await supabase
        .from("users")
        .update({ ...formData })
        .eq("id", user.id)
        .select()
        .single();

      const updatedUsers = [...users];
      updatedUsers[editingIndex] = data;
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      // Insert new user
      const { error, data } = await supabase
        .from("users")
        .insert([{ ...formData, status: "Pending" }])
        .select()
        .single();

      if (error) {
        alert("This code already exists!");
        return;
      }

      setUsers([...users, data]);
      setCurrentSlide({ ...currentSlide, [users.length]: 0 });
    }

    setFormData({ name: "", phone: "", email: "", photo: "", code: "", documents: [] });
  };

  const updateStatus = async (index, newStatus) => {
    const user = users[index];
    await supabase.from("users").update({ status: newStatus }).eq("id", user.id);

    const updatedUsers = [...users];
    updatedUsers[index].status = newStatus;
    setUsers(updatedUsers);
  };

  const removeDocument = async (userIndex, docIndex) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex].documents.splice(docIndex, 1);

    await supabase
      .from("users")
      .update({ documents: updatedUsers[userIndex].documents })
      .eq("id", updatedUsers[userIndex].id);

    setUsers(updatedUsers);
    if (currentSlide[userIndex] >= updatedUsers[userIndex].documents.length) {
      setCurrentSlide({ ...currentSlide, [userIndex]: 0 });
    }
  };

  const addDocumentToUser = (userIndex, file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const updatedUsers = [...users];
      updatedUsers[userIndex].documents.push(reader.result);

      await supabase
        .from("users")
        .update({ documents: updatedUsers[userIndex].documents })
        .eq("id", updatedUsers[userIndex].id);

      setUsers(updatedUsers);
    };
    reader.readAsDataURL(file);
  };

  const nextSlide = (userIndex) => {
    const docs = users[userIndex].documents;
    if (!docs || docs.length === 0) return;
    setCurrentSlide({ ...currentSlide, [userIndex]: (currentSlide[userIndex] + 1) % docs.length });
  };

  const prevSlide = (userIndex) => {
    const docs = users[userIndex].documents;
    if (!docs || docs.length === 0) return;
    setCurrentSlide({
      ...currentSlide,
      [userIndex]: (currentSlide[userIndex] - 1 + docs.length) % docs.length,
    });
  };

  const editUser = (index) => {
    setEditingIndex(index);
    setFormData(users[index]);
  };

  const deleteUser = async (index) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await supabase.from("users").delete().eq("id", users[index].id);
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      <section className="admin-section">
        <div className="admin-container">
          <h2 className="admin-title">Admin User Panel</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Profile Photo</label>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Document Images</label>
              <input type="file" name="documents" accept="image/*" multiple onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Register Code (Manual)</label>
              <input type="text" name="code" value={formData.code} onChange={handleChange} required />
            </div>
            <button type="submit" className="admin-btn">
              {editingIndex !== null ? "Update User" : "Register User"}
            </button>
          </form>

          {/* Users List */}
          <div className="admin-users">
            <h3>Registered Users</h3>
            {users.length === 0 && <p style={{ color: "gray" }}>No users registered yet.</p>}
            {users.map((user, userIndex) => (
              <div className="user-card" key={user.id}>
                {user.photo && <img src={user.photo} alt="Profile" className="profile-pic" />}
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Code:</strong> {user.code}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: user.status === "Accepted" ? "green" : user.status === "Declined" ? "red" : "orange",
                    }}
                  >
                    {user.status}
                  </span>
                </p>

                <div className="document-slider">
                  {user.documents && user.documents.length > 0 && (
                    <>
                      <button className="slide-btn left" onClick={() => prevSlide(userIndex)}>&#10094;</button>
                      <img src={user.documents[currentSlide[userIndex]]} alt="doc" className="document-preview" />
                      <button className="slide-btn right" onClick={() => nextSlide(userIndex)}>&#10095;</button>
                      <div className="slider-remove">
                        <button onClick={() => removeDocument(userIndex, currentSlide[userIndex])}>Remove</button>
                      </div>
                    </>
                  )}
                  <label className="add-doc-btn">
                    + Add Picture
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target.files.length > 0) addDocumentToUser(userIndex, e.target.files[0]);
                      }}
                    />
                  </label>
                </div>

                <div className="user-actions">
                  <button className="accept-btn" onClick={() => updateStatus(userIndex, "Accepted")}>Accept</button>
                  <button className="decline-btn" onClick={() => updateStatus(userIndex, "Declined")}>Decline</button>
                  <button className="edit-btn" onClick={() => editUser(userIndex)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteUser(userIndex)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
