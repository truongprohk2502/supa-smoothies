import { FC } from "react";
import { Link } from "react-router-dom";
import supabase, { ISmoothie } from "../config/supabaseClient";

interface IProps {
  smoothie: ISmoothie;
  onDelete: (id: number) => void;
}

const SmoothieCard: FC<IProps> = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id);

    if (error) {
      console.error(error);
    } else {
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SmoothieCard;
