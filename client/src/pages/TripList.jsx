import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Bid List</h1>
      <div className="tableContent">
        <table className='table'>
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th className="text-center">Project Name</th>
              <th className="text-center">My Bid Price</th>
              <th className="text-center">Returns (%)</th>
              <th className="text-center">Payout</th>
            </tr>
          </thead>
          <tbody className="tbod">
            {tripList.map((reservation, index) => (
              <tr key={reservation._id} className='h-8'>
                <td className='border-slate-700 text-center'>
                  {index + 1}
                </td>
                <td className='border-slate-700 text-center'>
                  {reservation.listingTitle}
                </td>
                <td className='border-slate-700 text-center '>
                  ksh. {reservation.totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td className='border-slate-700 text-center '>
                  {reservation.customerReturns}
                </td>
                <td className='border-slate-700 text-center'>
                  {((reservation.customerReturns / 100) * reservation.totalPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default TripList;
