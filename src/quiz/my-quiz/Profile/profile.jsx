import { Link } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import "./profile.scss";
import EditButton from "../../../components/EditButton/EditButon"



const InfoRow = ({ label, value }) => {
  const renderValue = () => {
    if (typeof value === "boolean") {
      return value ? "✅" : "❌";
    }

    return value || "-";
  };

  return (
    <div className="profile-user__row">
      <span className="profile-user__label">{label}</span>
      <span className="profile-user__value">{renderValue()}</span>
    </div>
  );
};
function Profile() {
  const { profile } = useAuth();

  if (!profile) {
    return <div>Loading...</div>;
  }


  return (
    <div className="profile-user">
      <h1>Profile</h1>
      <div className="profile-user__card">
        <InfoRow
          label="Customer Number:"
          value={profile.customer_number}
        />

        <InfoRow
          label="User name:"
          value={profile.username}
        />

        <InfoRow
          label="Title:"
          value={profile.title}
        />

        <InfoRow
          label="First Name:"
          value={profile.first_name}
        />

        <InfoRow
          label="Last Name:"
          value={profile.last_name}
        />

        <InfoRow
          label="Email:"
          value={profile.email}
        />

        <InfoRow
          label="Phone:"
          value={profile.phone}
        />

        <InfoRow
          label="Street:"
          value={profile.street}
        />

        <InfoRow
          label="Street number:"
          value={profile.street_number}
        />

        <InfoRow
          label="City:"
          value={profile.city}
        />

        <InfoRow
          label="Postal Code:"
          value={profile.postcode}
        />

        <InfoRow
          label="Subscription:"
          value={profile.has_subscription}
        />

        <InfoRow
          label="Description:"
          value={profile.description}
        />
        
        <InfoRow
          label="Active:"
          value={profile.is_active}
        />

        <InfoRow
          label="Created:"
          value={
            profile.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "-"
          }
        />

        <InfoRow
          label="Updated:"
          value={
            profile.updated_at
              ? new Date(profile.updated_at).toLocaleDateString()
              : "-"
          }
        />
      <EditButton to="/my-quiz/edit-profile" className="edit-button"/>
        
      </div>
    </div>
  );
}

export default Profile;