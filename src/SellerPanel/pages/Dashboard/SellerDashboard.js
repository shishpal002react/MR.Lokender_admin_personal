/** @format */

import { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";

const SellerDashboard = () => {
  const navigate = useNavigate();
  // const [totalUsers, setTotalUsers] = useState("");
  // const [totalProducts, setTotalProducts] = useState("");
  // const [totalCategories, setTotalCategories] = useState("");
  // const [totalSubCategory, setTotalSubCategory] = useState("");
  // const [totalnotify, setTotalnotify] = useState("");
  // const [totalBanner, setTotalBanner] = useState("");
  // const [totalCoupon, setTotalCoupon] = useState("");
  // const [totalOrder, setTotalOrder] = useState("");
  // const [totalSeller, setTotalSeller] = useState("");

  const [data, setData] = useState();
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/admin/total/counts/seller/${localStorage.getItem(
      "ID"
    )}`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("dashboard from seller section", res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "total Product",
      number: data?.totalProducts,
      icon: <i class="fa-solid fa-box text-2xl text-[#3c335d]"></i>,
      bg: "#3c335d",
      link: "/SellerProducts",
    },
    {
      progress: "bg-green-400",
      title: "total category",
      number: data?.totalCategories,
      icon: <i className=" fa-brands fa-slack text-2xl text-[#64878e]"></i>,
      bg: "#64878e",
      link: "/sellerCategory",
    },

    {
      progress: "bg-green-400",
      title: "total subcategory",
      number: data?.totalSubCategory,
      icon: (
        <i className=" fa-solid fa-layer-group text-2xl text-[#1b6975]"></i>
      ),
      bg: "#1b6975",
      link: "/seller/subCategory",
    },
    {
      progress: "bg-green-400",
      title: "total Orders",
      number: data?.totalOrder,
      icon: (
        <i className=" fa-solid fa-cart-shopping text-2xl text-[#637ce6]"></i>
      ),
      bg: "#637ce6",
      link: "/seller/orders",
    },
  ];
  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
                textTransform: "uppercase",
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(SellerDashboard);
