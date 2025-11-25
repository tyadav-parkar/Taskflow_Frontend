import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CheckSquare } from "lucide-react";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome back, {user?.name}! 👋
        </h1>
      </div>
    </div>
  );
};

export default Home;