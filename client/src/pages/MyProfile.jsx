import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/MyProfile.scss"
import { useParams, Link } from 'react-router-dom';
import { setProfileDetails, setPropertyList } from '../redux/state';
import ListingCard from '../components/ListingCard';

const MyProfile = () => {
    const [user, setUser] = useState({});
    const [propertyList, setPropertyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const dispatch = useDispatch();


    const getUserDetails = async () => {
        try {
            console.log('Fetching details for ID:', userId);
            const response = await fetch(`http://localhost:3001/users/${userId}/details`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setProfileDetails(data));
                setUser(data);
                setPropertyList(data.propertyList || []);
                console.log(data);
                console.log(propertyList);
            } else {
                console.error('Error fetching user details:', response.status);
            }

            setLoading(false);
        } catch (error) {
            console.error('Fetch user details failed:', error);
            setLoading(false);
        }
    };



    useEffect(() => {
        getUserDetails();
    }, [userId]);

    const [activeTab, setActiveTab] = useState('one');


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div>{loading ? (
            <Loader /> // Replace with your loading spinner or message
        ) : (
            <div>
                <Navbar /> {/* Assuming you have a Navbar component */}
                {/* <h1>My Profile</h1> */}

                {/* <!-- Shop Info --> */}
                <section id="shopInfo">
                    <div className="infoCards">
                        <div className="shopPhoto_Descriptions">
                            <div className="shopProfileImages">
                                <div className="shopimg">
                                    <img src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`} alt="profile photo" />
                                </div>
                                {/* <p>{user.profileImagePath}</p> */}
                            </div>

                            <div className="shopAbout">
                                <div className="aboutBlock">
                                    <div className="aboutIcon">
                                        <img src="../assets/target.jpg" />
                                    </div>

                                    <div className="aboutDesciption">
                                        <div className="title">
                                            <h2>Owner</h2>
                                        </div>

                                        <div className="igPage">
                                            <a href="">{user.firstName} {user.lastName}</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="aboutBlock">
                                    <div className="aboutIcon">
                                        <img src="../assets/calendar.png" />
                                    </div>

                                    <div className="aboutDesciption">
                                        <div className="title">
                                            <h2>Firm Name</h2>
                                        </div>

                                        <div className="igPage">
                                            <a href="">{user.firmName}</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="aboutBlock">
                                    <div className="aboutIcon">
                                        <img src="../assets/returns.jpg" />
                                    </div>

                                    <div className="aboutDesciption">
                                        <div className="title">
                                            <h2>Email</h2>
                                        </div>

                                        <div className="igPage">
                                            <a href="">{user.email}</a>
                                        </div>
                                    </div>
                                </div>



                                <div className="aboutBlock">
                                    <div className="aboutIcon">
                                        {/* <img src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public", "")}`} /> */}
                                    </div>

                                    <div className="aboutDesciption">
                                        <div className="title">
                                            <h2>Phone Number</h2>
                                        </div>

                                        <div className="igPage">
                                            <a href="">0726586111</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Toggle Shop nav --> */}
                {/* <section id="toggleShops">
                    <div className="toggleBtnss">
                        <div id="ProductsHeader" className="toggleHeaderProducts toggleHeaderBorder">
              <h2>Description</h2>
            </div>
                        <button
                            id="ProductsHeader"
                            className={`header-btn toggleHeaderProductss ${activeTab === 'one' ? 'toggleHeaderBorders' : ''}`}
                            onClick={() => handleTabChange('one')}
                        >1</button>

                        <div id="ProfileHeader" className="toggleHeaderProfile">
              <h2>Updates</h2>
            </div>
                        <button
                            id="ProductsHeader"
                            className={`header-btn toggleHeaderProductss ${activeTab === 'two' ? 'toggleHeaderBorders' : ''}`}
                            onClick={() => handleTabChange('two')}
                        >2</button>

                        <div id="ProfileHeader" className="toggleHeaderProfile">
              <h2>Host</h2>
            </div>

                    </div>
                </section> */}

                <div className={`tab`}>
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
                                            <h3 className="countryName">{user.firmName}</h3>
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
                                            <h3 className="countryName">{user.propertyList.length}</h3>
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


                {/* <p>Hello, {user.firstName || 'User'}!</p> Display a fallback if firstName is not available */}
                <Footer /> {/* Assuming you have a Footer component */}
            </div>
        )}
        </div>
    );
};

export default MyProfile;
