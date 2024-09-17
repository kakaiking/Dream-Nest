import React from 'react'
import "../styles/HostInfo.css"

const HostInfo = () => {
    return (
        // <!-- Profile Tab -->
        <section id="profile" >
            <div className="profileContent">
                <div className="profileDescription">
                    <div className="accType">
                        <h1>Verified Retailer</h1>
                        <img src="verifiedIcon.png" alt="Verified" />
                    </div>
                    <div className="categories">
                        <h2>Main Categories: Shoes, Apparel, Clothing Accessories</h2>
                    </div>
                    <div className="profileRate">
                        <div className="profileRateItem">
                            <h2 className="profileRateScore"><span className="profileScore">4.2 </span> /<span className="totalScore">5</span></h2>
                        </div>
                        <div className="profileRateItem">
                            <h2 className="profileRateReviews">6 reviews</h2>
                        </div>
                        <div className="profileRateItem"><button>Review</button></div>
                    </div>
                </div>

                <div className="verifiedProfile">
                    <div className="verifiedProfileHeader">
                        <h1>Verified Profile</h1>
                    </div>
                    <div className="verifiedProfileHeader2">
                        <h2>All information below has been verified</h2>
                    </div>
                    <div className="verifiedProfileData">
                        <div className="verifiedDatum">
                            <div className="verifiedDatumTitle">
                                <h2 className="country">Country</h2>
                            </div>
                            <div className="verifiedDatumData">
                                <h2 className="countryName">Kenya</h2>
                            </div>
                        </div>
                        <div className="separator"></div>

                        <div className="verifiedDatum">
                            <div className="verifiedDatumTitle">
                                <h2 className="country">Markets</h2>
                            </div>
                            <div className="verifiedDatumData">
                                <h2 className="countryName">Kiambu, Nairobi, Thika</h2>
                            </div>
                        </div>
                        <div className="separator"></div>

                        <div className="verifiedDatum">
                            <div className="verifiedDatumTitle">
                                <h2 className="country">Company Registration Date</h2>
                            </div>
                            <div className="verifiedDatumData">
                                <h2 className="countryName">09/12/2016</h2>
                            </div>
                        </div>
                        <div className="separator"></div>

                        <div className="verifiedDatum">
                            <div className="verifiedDatumTitle">
                                <h2 className="country">Business Model</h2>
                            </div>
                            <div className="verifiedDatumData">
                                <h2 className="countryName">B2B, B2C</h2>
                            </div>
                        </div>
                        <div className="separator"></div>

                        <div className="verifiedDatum">
                            <div className="verifiedDatumTitle">
                                <h2 className="country">Main Client Types</h2>
                            </div>
                            <div className="verifiedDatumData">
                                <h2 className="countryName">Consumers</h2>
                            </div>
                        </div>
                        <div className="separator"></div>

                        <div className="verifiedDatum">
                            <div className="verifiedDatumTitle">
                                <h2 className="country">Delivery Methods</h2>
                            </div>
                            <div className="verifiedDatumData">
                                <h2 className="countryName">Wells Fargo, Rider</h2>
                            </div>
                        </div>
                        <div className="separator"></div>

                        <div className="verifiedDatum">
                            <div className="verifiedDatumTitle">
                                <h2 className="country">Revenue (Last 180 days)</h2>
                            </div>
                            <div className="verifiedDatumData">
                                <h2 className="countryName">30,000 /=</h2>
                            </div>
                        </div>
                        <div className="separator"></div>

                        <div className="verifiedDatum">
                            <div className="verifiedDatumTitle">
                                <h2 className="country">Founder</h2>
                            </div>
                            <div className="verifiedDatumData">
                                <h2 className="countryName">Phil Kakai</h2>
                            </div>
                        </div>
                        <div className="separator"></div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default HostInfo
