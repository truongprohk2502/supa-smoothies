import { FC } from "react";
import supabase from "../config/supabaseClient";

const Home: FC = () => {
  console.log(supabase);

  return (
    <div className="page home">
      <h2>Home</h2>
    </div>
  );
};

export default Home;
