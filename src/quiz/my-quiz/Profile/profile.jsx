import { useAuth } from "../../../context/useAuth";
import "./profile.scss";

const InfoRow = ({ label, value }) => (
  <div className="profile-user__row">
    <span className="profile-user__label">{label}</span>
    <span className="profile-user__value">{value || "-"}</span>
  </div>
);

function Profile() {
  const { profile } = useAuth();

  if (!profile) {
    return <div>Loading...</div>;
  }


  return (
    <div className="profile-user">
      <div className="profile-user__card">
        <InfoRow
          label="Customer Number:"
          value={profile.customer_number}
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
          value={`${profile.street || ""} ${profile.street_number || ""}`}
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
          label="Role:"
          value={profile.role}
        />

        <InfoRow
          label="Subscription:"
          value={profile.has_subscription ? "Active" : "Inactive"}
        />

        <InfoRow
          label="Working Hours:"
          value={profile.working_hours}
        />

        <InfoRow
          label="Description:"
          value={profile.description}
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
      </div>
    </div>
  );
}

export default Profile;