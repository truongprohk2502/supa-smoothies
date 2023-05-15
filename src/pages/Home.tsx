import { FC, useEffect, useState } from "react";
import supabase, { ISmoothie } from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home: FC = () => {
  const [fetchError, setFetchError] = useState<string>("");
  const [smoothies, setSmoothies] = useState<ISmoothie[]>([]);
  const [orderBy, setOrderBy] = useState<"created_at" | "title" | "rating">(
    "created_at"
  );

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

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
  }, [orderBy]);

  const handleDelete = (id: number) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((sm) => sm.id !== id);
    });
  };

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
