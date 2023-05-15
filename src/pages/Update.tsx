import { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };

    fetchSmoothie();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    const { error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", id);

    if (error) {
      setFormError("Please fill in all the fields correctly.");
    } else {
      setFormError("");
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button type="submit">Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
