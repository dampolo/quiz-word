
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./edit-profile.scss";
import { useAuth } from "../../../../context/useAuth";

const InfoRow = ({
  label,
  value,
  name,
  type = "text",
  onChange,
  readOnly = false,
}) => (
  <div className="profile-user__row">
    <label htmlFor={name} className="profile-user__label">{label}</label>

    {readOnly ? (
      <span className="profile-user__value">{value || "-"}</span>
    ) : (
      <input
        className="profile-user__input input-field"
        id={name}
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
      />
    )}
  </div>
);

function EditProfile() {
  const { profile } = useAuth();

  const [form, setForm] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street: "",
    street_number: "",
    city: "",
    postcode: "",
    working_hours: "",
    description: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        title: profile.title || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        street: profile.street || "",
        street_number: profile.street_number || "",
        city: profile.city || "",
        postcode: profile.postcode || "",
        working_hours: profile.working_hours || "",
        description: profile.description || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    // call your API here
    // await updateProfile(form);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-user">
      <h1 className="title">Edit Profil</h1>
      
      <form className="profile-user__card" onSubmit={handleSubmit}>
        <InfoRow
          label="Customer Number:"
          value={profile.customer_number}
          readOnly
        />

        <InfoRow
          label="Title:"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <InfoRow
          label="First Name:"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />

        <InfoRow
          label="Last Name:"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />

        <InfoRow
          label="Email:"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <InfoRow
          label="Phone:"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <InfoRow
          label="Street:"
          name="street"
          value={form.street}
          onChange={handleChange}
        />

        <InfoRow
          label="Street Number:"
          name="street_number"
          value={form.street_number}
          onChange={handleChange}
        />

        <InfoRow
          label="City:"
          name="city"
          value={form.city}
          onChange={handleChange}
        />

        <InfoRow
          label="Postal Code:"
          name="postcode"
          value={form.postcode}
          onChange={handleChange}
        />

        <InfoRow
          label="Role:"
          value={profile.role}
          readOnly
        />

        <InfoRow
          label="Subscription:"
          value={profile.has_subscription ? "Active" : "Inactive"}
          readOnly
        />

        <InfoRow
          label="Working Hours:"
          name="working_hours"
          value={form.working_hours}
          onChange={handleChange}
        />

        <div className="profile-user__row">
          <label className="profile-user__label">Description:</label>

          <textarea
            className="profile-user__textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <InfoRow
          label="Created:"
          value={
            profile.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "-"
          }
          readOnly
        />

        <InfoRow
          label="Updated:"
          value={
            profile.updated_at
              ? new Date(profile.updated_at).toLocaleDateString()
              : "-"
          }
          readOnly
        />
        <div className="action-buttons">
            <Link to="/my-quiz/profile" className="main-quiz-button-cancel">
            Zurück
            </Link>
            <button type="submit" className="main-quiz-button">
            Speichern
            </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;