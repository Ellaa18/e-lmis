import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/admin.css";

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

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);

    const slides = {};
    savedUsers.forEach((_, index) => (slides[index] = 0));
    setCurrentSlide(slides);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = { ...formData, status: users[editingIndex].status };
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setEditingIndex(null);
    } else {
      if (users.some((user) => user.code === formData.code)) {
        alert("This code already exists!");
        return;
      }
      const newUser = { ...formData, status: "Pending" };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setCurrentSlide({ ...currentSlide, [updatedUsers.length - 1]: 0 });
    }

    setFormData({ name: "", phone: "", email: "", photo: "", code: "", documents: [] });
  };

  const updateStatus = (index, newStatus) => {
    const updatedUsers = [...users];
    updatedUsers[index].status = newStatus;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const removeDocument = (userIndex, docIndex) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex].documents.splice(docIndex, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    if (currentSlide[userIndex] >= updatedUsers[userIndex].documents.length) {
      setCurrentSlide({ ...currentSlide, [userIndex]: 0 });
    }
  };

  const addDocumentToUser = (userIndex, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedUsers = [...users];
      updatedUsers[userIndex].documents.push(reader.result);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
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
    setFormData({
      name: users[index].name,
      phone: users[index].phone,
      email: users[index].email,
      photo: users[index].photo,
      code: users[index].code,
      documents: users[index].documents,
    });
  };

  const deleteUser = (index) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
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

          <div className="admin-users">
            <h3>Registered Users</h3>
            {users.length === 0 && <p style={{ color: "gray" }}>No users registered yet.</p>}

            {users.map((user, userIndex) => (
              <div className="user-card" key={userIndex}>
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
                      color:
                        user.status === "Accepted"
                          ? "green"
                          : user.status === "Declined"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {user.status}
                  </span>
                </p>

                <div className="document-slider">
                  {user.documents && user.documents.length > 0 && (
                    <>
                      <button className="slide-btn left" onClick={() => prevSlide(userIndex)}>
                        &#10094;
                      </button>
                      <img
                        src={user.documents[currentSlide[userIndex]]}
                        alt="doc"
                        className="document-preview"
                      />
                      <button className="slide-btn right" onClick={() => nextSlide(userIndex)}>
                        &#10095;
                      </button>
                      <div className="slider-remove">
                        <button onClick={() => removeDocument(userIndex, currentSlide[userIndex])}>
                          Remove
                        </button>
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
                        if (e.target.files.length > 0) {
                          addDocumentToUser(userIndex, e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="user-actions">
                  <button className="accept-btn" onClick={() => updateStatus(userIndex, "Accepted")}>
                    Accept
                  </button>
                  <button className="decline-btn" onClick={() => updateStatus(userIndex, "Declined")}>
                    Decline
                  </button>
                  <button className="edit-btn" onClick={() => editUser(userIndex)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteUser(userIndex)}>
                    Delete
                  </button>
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
