import { categories } from "../data";
import "../styles/Categories.scss"
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p style={{fontSize: "Large", marginTop: "20px"}}>
      Unleash the potential of your funding projects with our dynamic platform! Whether you're 
      a visionary creator or an enthusiastic supporter, dive into a world of opportunities where 
      innovation meets impact. Join us and turn your ambitious ideas into reality, while making a 
      difference together.
      </p>

      <div className="categories_list">
        {categories?.slice(1, 5).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
