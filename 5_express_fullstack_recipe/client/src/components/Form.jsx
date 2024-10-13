import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select/creatable";

const Form = ({ isLoading, mutate, recipeData }) => {
  const [ingredients, setIngredients] = useState(
    recipeData?.ingredients || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // bütün inputlardaki verilere obje formatında eriş
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    // adımları ',' e göre diziye çevir
    newRecipe.instructions = newRecipe.instructions.split(",");

    // malzemeleri nesneye ekle
    newRecipe.ingredients = ingredients;

    // eğerki düzenlem modundaysak newRecipe içerise id değerinide ekle
    if (recipeData) {
      newRecipe.id = recipeData.id;
    }

    // api isteği at
    mutate(newRecipe);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 flex flex-col gap-7 max-w-[550px] mx-auto"
    >
      <Field label="Başlık">
        <input
          className="inp"
          name="recipeName"
          required
          defaultValue={recipeData?.recipeName}
        />
      </Field>

      <Field label="Kategori">
        <input
          className="inp"
          name="category"
          required
          defaultValue={recipeData?.category}
        />
      </Field>

      <Field label="Süre">
        <input
          type="number"
          className="inp"
          name="recipeTime"
          required
          defaultValue={recipeData?.recipeTime}
        />
      </Field>

      <Field label="Malzemeler">
        <Select
          isMulti
          value={ingredients.map((i) => ({ value: i, label: i }))}
          onChange={(options) =>
            setIngredients(options.map((opt) => opt.value))
          }
          required
        />
      </Field>

      <Field label="Tarif Adımları (, ile ayırın)">
        <textarea
          name="instructions"
          className="inp min-h-[80px] max-h-[200px]"
          required
          defaultValue={recipeData?.instructions}
        ></textarea>
      </Field>

      <Field label="Sunum Önerisi">
        <textarea
          name="servingSuggestion"
          className="inp min-h-[80px] max-h-[300px]"
          defaultValue={recipeData?.servingSuggestion}
        ></textarea>
      </Field>

      <div className="flex justify-end gap-6">
        <Link to="/" className="btn">
          Geri
        </Link>

        <button
          disabled={isLoading}
          type="submit"
          className="btn bg-red-400 hover:bg-red-500"
        >
          {recipeData ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  );
};

// HOC - Higher Order Compont
const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>

      {children}
    </div>
  );
};

export default Form;
