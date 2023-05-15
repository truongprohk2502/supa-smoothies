import { FC, useEffect, useState } from "react";
import supabase, { ISmoothie } from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home: FC = () => {
  const [fetchError, setFetchError] = useState<string>("");
  const [smoothies, setSmoothies] = useState<ISmoothie[]>([]);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();

      if (error) {
        console.error(error);
        setFetchError("Could not fetch the smoothies");
        setSmoothies([]);
      }
      if (data) {
        setSmoothies(data as ISmoothie[]);
        setFetchError("");
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
