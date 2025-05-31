import { useNavigate } from "react-router-dom";
import Button from "../components/CustomButton"; // Import the Button component
import { Link } from "react-router-dom"

function AccountOptions() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    navigate(`/signup?role=${role}`); // Navigate to signup page with role
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Link to="/">
        <MoveLeft className="absolute top-5 left-4 hover:shadow-lg hover:bg-white transition duration-500 " />
      </Link>
      <div>
        <h2 className="text-xl font-semibold mb-4">Signup as:</h2>
        <Button
          onClick={() => handleSelectRole("customer")}
          text="Student"
          variant="secondary"
          as="choice"
        />
        <Button
          onClick={() => handleSelectRole("vendor")}
          text="Employer"
          variant="secondary"
          as="choice"
        />
        <Button
          onClick={() => handleSelectRole("customer")}
          text="Mentor"
          variant="secondary"
          as="choice"
        />
        <Button
          onClick={() => handleSelectRole("vendor")}
          text="Organization"
          variant="secondary"
          as="choice"
        />
      </div>
    </div>
  );
}

export default AccountOptions;
