import { useEffect, useState, useRef } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer"
import { grey } from "@mui/material/colors";

const ListingDetails = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [listingTitle, setListingTitle] = useState('')
  const [customerEmail, setCustomerEmail] = useState("") 
  const [hostEmail, setHostEmail] = useState("") 
  const [customerName, setCustomerName] = useState("")
  const [customerReturns, setCustomerReturns] = useState("")


  const getListingDetails = async () => {
    try {
      console.log("Fetching listing details for ID:", listingId);
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Received data:", data);
      setListing(data);
      setListingTitle(data.title)
      setCustomerReturns(data.returns)
      setHostEmail(data.creator.email)
      

      // Calculate price per share only if listing.target is available
      if (data && data.target) {
        setPricePerShare(data.target / totalShares);
      }

      setLoading(false);
    } catch (err) {
      console.error("Fetch Listing Details Failed", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);


  useEffect(() => {
    setCustomerEmail(user.email);
    setCustomerName(`${user.firstName} ${user.lastName}`);
  }, []);
  console.log(`${hostEmail}`)
  
  /* BOOKING CALENDAR */
  // const [dateRange, setDateRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

  // const handleSelect = (ranges) => {
  //   // Update the selected date range when user makes a selection
  //   setDateRange([ranges.selection]);
  // };

  const [pricePerShare, setPricePerShare] = useState(0);
  const totalShares = 100;
  // const remainingShares = 50;

  const [guestCount, setGuestCount] = useState(1);

  const [activeTab, setActiveTab] = useState('description');


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        customerEmail,
        customerName,
        totalPrice: pricePerShare.toFixed(2) * guestCount,
        listingTitle,
        customerReturns
      }

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm)
      })

      if (response.ok) {
        navigate(`/${customerId}/trips`)
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message)
    }
  };

  const [timeLeft, setTimeLeft] = useState('');
  // Set the date we're counting down to

  useEffect(() => {
    if (!listing?.bidExpiry) return;

    const updateTimer = () => {
      // Get today's date and time

      const countDownDate = new Date(listing.bidExpiry).getTime();

      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format the time left
      const formattedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setTimeLeft(formattedTime);

      // If the count down is over, update with a message
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('EXPIRED');
      }
    };


    // Update the timer every second
    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);


  }, [listing?.bidExpiry]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      {/* <!-- Shop Info --> */}
      <section id="shopInfo">
        <div className="infoCard">
          <div className="shopPhoto_Description">
            <div className="shopProfileImage"><img src="../assets/glossy_golden_coin.png" alt="Shop Profile Image" /></div>
            <div className="shopDescription">
              <div className="shopDescriptionText">
                <p>{listing.highlightDesc}</p>
              </div>
              {/* <div className="shopAccessBtns">
                <button className="followBtn">Add to WishList</button>
              </div> */}
            </div>
          </div>

          <div className="shopAbout">
            <div className="aboutBlock">
              <div className="aboutIcon">
                <img src="../assets/target.jpg" />
              </div>

              <div className="aboutDesciption">
                <div className="title">
                  <h2>Target</h2>
                </div>

                <div className="igPage">
                  <a href="">{listing.target.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</a>
                </div>
              </div>
            </div>

            <div className="aboutBlock">
              <div className="aboutIcon">
                <img src="../assets/returns.jpg" />
              </div>

              <div className="aboutDesciption">
                <div className="title">
                  <h2>Returns (%)</h2>
                </div>

                <div className="igPage">
                  <a href="">{listing.returns}</a>
                </div>
              </div>
            </div>

            <div className="aboutBlock">
              <div className="aboutIcon">
                <img src="../assets/calendar.png" />
              </div>

              <div className="aboutDesciption">
                <div className="title">
                  <h2>Bid Expiry Date</h2>
                </div>

                <div className="igPage">
                  <a href="">{listing.bidExpiry}</a>
                </div>
              </div>
            </div>

            <div className="aboutBlock">
              <div className="aboutIcon">
                <img src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public", "")}`} />
              </div>

              <div className="aboutDesciption">
                <div className="title">
                  <h2>Host</h2>
                </div>

                <div className="igPage">
                  <a href="">{listing.creator.firstName} {listing.creator.lastName}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <h2>
          Earn upto {listing.returns}% from {listing.financialInstruments}<br />
          {" "}
        </h2>
        <h4>Bid payout dates: {listing.paymentDates}</h4>
        <h4> {listing.type}</h4>
        <h4>Status: {timeLeft}</h4>

        {/* <!-- Toggle Shop nav --> */}
        <section id="toggleShop">
          <div className="toggleBtns">
            {/* <div id="ProductsHeader" className="toggleHeaderProducts toggleHeaderBorder">
              <h2>Description</h2>
            </div> */}
            <button
              id="ProductsHeader"
              className={`header-btn toggleHeaderProducts ${activeTab === 'description' ? 'toggleHeaderBorder' : ''}`}
              onClick={() => handleTabChange('description')}
            >Description</button>

            {/* <div id="ProfileHeader" className="toggleHeaderProfile">
              <h2>Host</h2>
            </div> */}
            <button
              id="ProductsHeader"
              className={`header-btn toggleHeaderProducts ${activeTab === 'host' ? 'toggleHeaderBorder' : ''}`}
              onClick={() => handleTabChange('host')}
            >Host</button>
          </div>
          <div className="toggleBar"></div>
        </section>


        <div className={`tab ${activeTab === 'description' ? 'description' : 'hidden'}`}>
          <div className='descriptionText'>
            <h3>Description</h3>
            <p>{listing.description}</p>
          </div>

          <div className='bidInfo'>
            <h2>How Many Shares Of This Project Do You Want?</h2>
            <div className="date-range-calendar">
              <h3>
                {'Target: ' + listing.target.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h3>              
              <h3 style={{ marginTop: '10px' }}>
                Price per Share: {pricePerShare.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h3>
              <div className="basic">
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: grey },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: grey },
                    }}
                  />
                </div>
              </div>



              <div className="totalPrice">
                {guestCount > 1 ? (
                  <h2>
                    {pricePerShare.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/= x {guestCount} Shares
                  </h2>
                ) : (
                  <h2>
                    {pricePerShare.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/= x {guestCount} Share
                  </h2>
                )}
                <h2>
                  Total Bid Price: ksh.{(pricePerShare * guestCount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h2>              
              </div>


              <button className="button" type="submit" onClick={handleSubmit}>
                PLACE BID
              </button>
              <button className="button" >
                CONTACT
              </button>
            </div>
          </div>
        </div>

        <div className={`tab  ${activeTab === 'host' ? 'host' : 'hidden'}`}>
          {/* Profile Tab */}
          <section id="profile" > {/* Changed hidden to inline style */}
            <div className="profileContent">
              <div className="verifiedProfile">
                <div className="verifiedProfileHeader">
                  <h1>Professional Details:</h1>
                </div>
                {/* <div className="verifiedProfileHeader2">
                                        <h2>All information below has been verified</h2>
                                    </div> */}
                <div className="verifiedProfileData">
                  <div className="verifiedDatum">
                    <div className="verifiedDatumTitle">
                      <h2 className="country">Company / Firm Name</h2>
                    </div>
                    <div className="verifiedDatumData">
                      <h3 className="countryName">{listing.creator.firmName}</h3>
                    </div>
                  </div>
                  <div className="separator"></div>

                  <div className="verifiedDatum">
                    <div className="verifiedDatumTitle">
                      <h2 className="country">Been A Fund Manager Since</h2>
                    </div>
                    <div className="verifiedDatumData">
                      <h3 className="countryName">19/02/2001</h3>
                    </div>
                  </div>
                  <div className="separator"></div>

                  <div className="verifiedDatum">
                    <div className="verifiedDatumTitle">
                      <h2 className="country">CMA License Number</h2>
                    </div>
                    <div className="verifiedDatumData">
                      <h3 className="countryName">187</h3>
                    </div>
                  </div>
                  <div className="separator"></div>

                  <div className="verifiedDatum">
                    <div className="verifiedDatumTitle">
                      <h2 className="country">LinkedIn Profile / Professional Website</h2>
                    </div>
                    <div className="verifiedDatumData">
                      <h3 className="countryName">muamana.ac.ke</h3>
                    </div>
                  </div>
                  <div className="separator"></div>

                  <div className="verifiedDatum">
                    <div className="verifiedDatumTitle">
                      <h2 className="country"> Hosted Funding Projects</h2>
                    </div>
                    <div className="verifiedDatumData">
                      <h3 className="countryName">{listing.creator.propertyList.length}</h3>
                    </div>
                  </div>
                  <div className="separator"></div>


                  <div className="verifiedDatum">
                    <div className="verifiedDatumTitle">
                      <h2 className="country">Assets Under Management</h2>
                    </div>
                    <div className="verifiedDatumData">
                      <h3 className="countryName">2</h3>
                    </div>
                  </div>
                  <div className="separator"></div>

                  <div className="verifiedDatum">
                    <div className="verifiedDatumTitle">
                      <h2 className="country">Major Investment Tools Used</h2>
                    </div>
                    <div className="verifiedDatumData">
                      <h3 className="countryName">Securities, Commercial Papers</h3>
                    </div>
                  </div>
                  <div className="separator"></div>

                  <div className="verifiedDatum">
                    <div className="verifiedDatumTitle">
                      <h2 className="country">Physical Address</h2>
                    </div>
                    <div className="verifiedDatumData">
                      <h3 className="countryName">P.O BOX 25749-00603, Nairobi</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
