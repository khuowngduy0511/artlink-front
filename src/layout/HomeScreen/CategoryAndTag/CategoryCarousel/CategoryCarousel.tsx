import React from "react";
import Tag from "../../../../components/Tag";

type CategoryProps = {
  id: string;
  categoryName: string;
};

type CategoriesProps = {
  categories: CategoryProps[];
};

const CategoryCarousel: React.FC<CategoriesProps> = ({ categories }) => {
  // Handle null/undefined/non-array data
  const validCategories = Array.isArray(categories) ? categories : [];
  
  return (
    <div className="category-carousel flex">
      {validCategories.map((category) => {
        return (
          <Tag
            key={category.id}
            id={category.id}
            tagName={category.categoryName}
            isCategory={true}
          />
        );
      })}
    </div>
  );
};

export default CategoryCarousel;
