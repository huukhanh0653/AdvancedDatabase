import React, { useState, useEffect } from "react";
import Item from "../components/Item";

const Category = () => {
  const [areas, setAreas] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedArea, setSelectedArea] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch products based on filters
  const fetchProducts = (areaId, branchId, category) => {
    let query = ``;
    if (areaId) query = `http://localhost:5000/customer/menu/${areaId}`;
    if (branchId) query = `http://localhost:5000/customer/menu/${areaId}/${branchId}`;
    if (category) query = `http://localhost:5000/customer/menu/${areaId}/${branchId}/${category}`;

    fetch(query)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  // Fetch areas
  useEffect(() => {
    fetch("http://localhost:5000/customer/get-all-khuvuc")
      .then((res) => res.json())
      .then((data) => {
        const uniqueAreas = [...new Set(data.map((item) => ({ id: item.MaKV, name: item.TenKhuVuc })))];
        setAreas(uniqueAreas);
      });
  }, []);

  // Fetch branches when area changes
  useEffect(() => {
    if (selectedArea) {
      fetch(`http://localhost:5000/customer/get-chinhanh/${selectedArea}`)
        .then((res) => res.json())
        .then((data) => {
          const uniqueBranches = [...new Set(data.map((item) => ({ id: item.MaCN, name: item.TenCN })))];
          setBranches(uniqueBranches);
        });
    } else {
      setBranches([]);
    }
  }, [selectedArea]);

  // Fetch categories when branch changes
  useEffect(() => {
    if (selectedBranch) {
      fetch(`http://localhost:5000/customer/get-all-phanloai`)
        .then((res) => res.json())
        .then((data) => {
          const uniqueCategories = [...new Set(data.map((item) => item.PhanLoai))];
          setCategories(uniqueCategories);
        });
    } else {
      setCategories([]);
    }
  }, [selectedBranch]);

  // Handle filters
  const handleAreaChange = (event) => {
    const areaId = event.target.value;
    setSelectedArea(areaId);
    setSelectedBranch("");
    setSelectedCategory("");
    fetchProducts(areaId, "", "");
  };

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    setSelectedCategory("");
    fetchProducts(selectedArea, branchId, "");
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchProducts(selectedArea, selectedBranch, category);
  };

  return (
    <section className="max_padd_container py-5 xl:py-14">
      <div>
        <div className="flexBetween my-8 mx-2">
          {/* Area Dropdown */}
          <select
            value={selectedArea}
            onChange={handleAreaChange}
            className="h-14 w-fit pl-5 bg-white outline-none rounded-xl border border-gray-300 "
          >
            <option value="">Chọn khu vực</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
          {/* Branch Dropdown */}
          <select
            value={selectedBranch}
            onChange={handleBranchChange}
            className="h-14 w-1/2 pl-5 bg-white outline-none rounded-xl border border-gray-300 "
            disabled={!selectedArea}
          >
            <option value="">Chọn chi nhánh</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="h-14 w-1/4 pl-5 bg-white outline-none rounded-xl border border-gray-300 "
            disabled={!selectedBranch}
          >
            <option value="">Chọn phân loại</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

          <div className="flexBetween my-4 mx-2">
          <h5>
            <span className="font-bold">Hiển thị {products.length}</span> sản phẩm
          </h5>
            <input type="text" placeholder='Tìm kiếm món ăn'
              className="flex h-14 w-1/3 pl-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              aria-label="Search" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <Item
              key={item.MaMon}
              id={item.MaMon}
              image={item.HinhAnh}
              name={item.TenMon}
              old_price={item.GiaTien}
            />
          ))}
        </div>
        <div className="mt-16 text-center">
          <button className="btn_dark_rounded">Tải thêm</button>
        </div>
      </div>
    </section>
  );
};

export default Category;
