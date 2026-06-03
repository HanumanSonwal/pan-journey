// import Link from "next/link";

// const LINK_GROUPS = [
//   {
//     title: "ABOUT PAN JOURNEY",
//     links: [
//       {
//         label: "About Us",
//         url: "/about-us",
//       },

//       {
//         label: "Investor Relations",
//         url: "/investor-relations",
//       },

//       {
//         label: "Careers",
//         url: "/careers",
//       },

//       {
//         label: "Sustainability",
//         url: "/sustainability",
//       },

//       {
//         label: "PAN Journey Foundation",
//         url: "/foundation",
//       },

//       {
//         label: "Legal Notices",
//         url: "/legal-notices",
//       },

//       {
//         label: "CSR Policy",
//         url: "/csr-policy",
//       },

//       {
//         label: "Travel Agent Portal",
//         url: "/travel-agent-portal",
//       },

//       {
//         label: "List Your Hotel",
//         url: "/list-your-hotel",
//       },

//       {
//         label: "Partners - Redbus",
//         url: "/partners/redbus",
//       },

//       {
//         label: "Partners - Goibibo",
//         url: "/partners/goibibo",
//       },

//       {
//         label: "Advertise With Us",
//         url: "/advertise-with-us",
//       },

//       {
//         label: "Holiday Franchise",
//         url: "/holiday-franchise",
//       },
//     ],
//   },

//   {
//     title: "ABOUT SITE",
//     links: [
//       {
//         label: "Customer Support",
//         url: "/customer-support",
//       },

//       {
//         label: "PAN Journey Loyalty Program",
//         url: "/loyalty-program",
//       },

//       {
//         label: "Payment Security",
//         url: "/payment-security",
//       },

//       {
//         label: "Privacy Policy",
//         url: "/privacy-policy",
//       },

//       {
//         label: "Cookie Policy",
//         url: "/cookie-policy",
//       },

//       {
//         label: "User Agreement",
//         url: "/user-agreement",
//       },

//       {
//         label: "Terms of Service",
//         url: "/terms-of-service",
//       },

//       {
//         label: "Terms & Conditions",
//         url: "/terms-and-conditions",
//       },

//       {
//         label: "Refund Policy",
//         url: "/refund-policy",
//       },

//       {
//         label: "Franchise Offices",
//         url: "/franchise-offices",
//       },

//       {
//         label: "Make A Payment",
//         url: "/make-a-payment",
//       },

//       {
//         label: "Work From Home",
//         url: "/work-from-home",
//       },

//       {
//         label: "Escalation Channel",
//         url: "/escalation-channel",
//       },
//     ],
//   },

//   {
//     title: "POPULAR HOTEL DESTINATIONS",
//     links: [
//       {
//         label: "Hotels in Thailand",
//         url: "/hotels/thailand",
//       },

//       {
//         label: "Hotels in Goa",
//         url: "/hotels/goa",
//       },

//       {
//         label: "Hotels in Mumbai",
//         url: "/hotels/mumbai",
//       },

//       {
//         label: "Hotels in Mahabaleshwar",
//         url: "/hotels/mahabaleshwar",
//       },

//       {
//         label: "Hotels in Matheran",
//         url: "/hotels/matheran",
//       },

//       {
//         label: "Hotels in Lonavala",
//         url: "/hotels/lonavala",
//       },

//       {
//         label: "Hotels in Delhi",
//         url: "/hotels/delhi",
//       },

//       {
//         label: "Hotels in Shimla",
//         url: "/hotels/shimla",
//       },

//       {
//         label: "Hotels in Lansdowne",
//         url: "/hotels/lansdowne",
//       },

//       {
//         label: "Hotels in Digha",
//         url: "/hotels/digha",
//       },

//       {
//         label: "Hotels in Puri",
//         url: "/hotels/puri",
//       },

//       {
//         label: "Hotels in Nainital",
//         url: "/hotels/nainital",
//       },

//       {
//         label: "Hotels in Shirdi",
//         url: "/hotels/shirdi",
//       },

//       {
//         label: "Hotels in Bangalore",
//         url: "/hotels/bangalore",
//       },

//       {
//         label: "Hotels in Mussoorie",
//         url: "/hotels/mussoorie",
//       },

//       {
//         label: "Hotels in Manali",
//         url: "/hotels/manali",
//       },

//       {
//         label: "Hotels Near Me",
//         url: "/hotels",
//       },

//       {
//         label: "Cheap Hotels",
//         url: "/hotels",
//       },

//       {
//         label: "Hotels in Jaipur",
//         url: "/hotels/jaipur",
//       },

//       {
//         label: "Hotels in Udaipur",
//         url: "/hotels/udaipur",
//       },

//       {
//         label: "Hotels in Pune",
//         url: "/hotels/pune",
//       },

//       {
//         label: "Hotels in Pondicherry",
//         url: "/hotels/pondicherry",
//       },

//       {
//         label: "Hotels in Ooty",
//         url: "/hotels/ooty",
//       },

//       {
//         label: "Hotels in Kodaikanal",
//         url: "/hotels/kodaikanal",
//       },

//       {
//         label: "Hotels in Darjeeling",
//         url: "/hotels/darjeeling",
//       },

//       {
//         label: "Hotels in Chandigarh",
//         url: "/hotels/chandigarh",
//       },

//       {
//         label: "Hotels in Mount Abu",
//         url: "/hotels/mount-abu",
//       },

//       {
//         label: "Hotels in Ahmedabad",
//         url: "/hotels/ahmedabad",
//       },

//       {
//         label: "Hotels in Kolkata",
//         url: "/hotels/kolkata",
//       },

//       {
//         label: "Hotels in Ranthambore",
//         url: "/hotels/ranthambore",
//       },

//       {
//         label: "Jaisalmer Hotels",
//         url: "/hotels/jaisalmer",
//       },

//       {
//         label: "Mysore Hotels",
//         url: "/hotels/mysore",
//       },
//     ],
//   },

//   {
//     title: "TOP STATES",
//     links: [
//       {
//         label: "Hotels in Kerala",
//         url: "/hotels/kerala",
//       },
//       {
//         label: "Hotels in Punjab",
//         url: "/hotels/punjab",
//       },
//       {
//         label: "Hotels in Gujarat",
//         url: "/hotels/gujarat",
//       },
//       {
//         label: "Hotels in Andhra Pradesh",
//         url: "/hotels/andhra-pradesh",
//       },
//       {
//         label: "Hotels in Arunachal Pradesh",
//         url: "/hotels/arunachal-pradesh",
//       },
//       {
//         label: "Hotels in Assam",
//         url: "/hotels/assam",
//       },
//       {
//         label: "Hotels in Bihar",
//         url: "/hotels/bihar",
//       },
//       {
//         label: "Hotels in Chhattisgarh",
//         url: "/hotels/chhattisgarh",
//       },
//       {
//         label: "Hotels in Haryana",
//         url: "/hotels/haryana",
//       },
//       {
//         label: "Hotels in Himachal Pradesh",
//         url: "/hotels/himachal-pradesh",
//       },
//       {
//         label: "Hotels in Jharkhand",
//         url: "/hotels/jharkhand",
//       },
//       {
//         label: "Hotels in Karnataka",
//         url: "/hotels/karnataka",
//       },
//       {
//         label: "Hotels in Ladakh",
//         url: "/hotels/ladakh",
//       },
//       {
//         label: "Hotels in Madhya Pradesh",
//         url: "/hotels/madhya-pradesh",
//       },
//       {
//         label: "Hotels in Maharashtra",
//         url: "/hotels/maharashtra",
//       },
//       {
//         label: "Hotels in Manipur",
//         url: "/hotels/manipur",
//       },
//       {
//         label: "Hotels in Meghalaya",
//         url: "/hotels/meghalaya",
//       },
//       {
//         label: "Hotels in Mizoram",
//         url: "/hotels/mizoram",
//       },
//       {
//         label: "Hotels in Nagaland",
//         url: "/hotels/nagaland",
//       },
//       {
//         label: "Hotels in Odisha",
//         url: "/hotels/odisha",
//       },
//       {
//         label: "Hotels in Telangana",
//         url: "/hotels/telangana",
//       },
//       {
//         label: "Hotels in Tripura",
//         url: "/hotels/tripura",
//       },
//       {
//         label: "Hotels in Rajasthan",
//         url: "/hotels/rajasthan",
//       },
//       {
//         label: "Hotels in Tamil Nadu",
//         url: "/hotels/tamil-nadu",
//       },
//       {
//         label: "Hotels in Uttar Pradesh",
//         url: "/hotels/uttar-pradesh",
//       },
//       {
//         label: "Hotels in Uttarakhand",
//         url: "/hotels/uttarakhand",
//       },
//       {
//         label: "Hotels in West Bengal",
//         url: "/hotels/west-bengal",
//       },
//     ],
//   },

//   {
//     title: "TOP PROPERTIES",
//     links: [
//       {
//         label: "W Goa",
//         url: "/hotel-details/goa/w-goa",
//       },
//       {
//         label: "The Leela Goa",
//         url: "/hotel-details/goa/the-leela-goa",
//       },
//       {
//         label: "The Tamara Coorg",
//         url: "/hotel-details/coorg/the-tamara-coorg",
//       },
//       {
//         label: "Evolve Back Coorg",
//         url: "/hotel-details/coorg/evolve-back-coorg",
//       },
//       {
//         label: "Grand Hyatt Goa",
//         url: "/hotel-details/goa/grand-hyatt-goa",
//       },
//       {
//         label: "Taj Lake Palace Udaipur",
//         url: "/hotel-details/udaipur/taj-lake-palace-udaipur",
//       },
//       {
//         label: "The Leela Palace Udaipur",
//         url: "/hotel-details/udaipur/the-leela-palace-udaipur",
//       },
//       {
//         label: "Grand Hyatt Mumbai",
//         url: "/hotel-details/mumbai/grand-hyatt-mumbai",
//       },
//       {
//         label: "JW Marriott Chandigarh",
//         url: "/hotel-details/chandigarh/jw-marriott-chandigarh",
//       },
//       {
//         label: "Alila Diwa Goa",
//         url: "/hotel-details/goa/alila-diwa-goa",
//       },
//       {
//         label: "Evolve Back Hampi",
//         url: "/hotel-details/hampi/evolve-back-hampi",
//       },
//       {
//         label: "Evolve Back Kabini",
//         url: "/hotel-details/kabini/evolve-back-kabini",
//       },
//       {
//         label: "Hyatt Regency Mumbai",
//         url: "/hotel-details/mumbai/hyatt-regency-mumbai",
//       },
//       {
//         label: "Le Meridien Delhi",
//         url: "/hotel-details/delhi/le-meridien-delhi",
//       },
//       {
//         label: "ITC Grand Chola Chennai",
//         url: "/hotel-details/chennai/itc-grand-chola-chennai",
//       },
//       {
//         label: "Rambagh Palace Jaipur",
//         url: "/hotel-details/jaipur/rambagh-palace-jaipur",
//       },
//       {
//         label: "Le Meridien Goa",
//         url: "/hotel-details/goa/le-meridien-goa",
//       },
//       {
//         label: "Taj Lands End Mumbai",
//         url: "/hotel-details/mumbai/taj-lands-end-mumbai",
//       },
//       {
//         label: "Jai Mahal Palace Jaipur",
//         url: "/hotel-details/jaipur/jai-mahal-palace-jaipur",
//       },
//       {
//         label: "Vythiri Resort Wayanad",
//         url: "/hotel-details/wayanad/vythiri-resort-wayanad",
//       },
//       {
//         label: "Red Earth Kabini",
//         url: "/hotel-details/kabini/red-earth-kabini",
//       },
//       {
//         label: "Taj Mahal Tower Mumbai",
//         url: "/hotel-details/mumbai/taj-mahal-tower-mumbai",
//       },
//       {
//         label: "The Serai Bandipur",
//         url: "/hotel-details/bandipur/the-serai-bandipur",
//       },
//       {
//         label: "Wildflower Hall Shimla",
//         url: "/hotel-details/shimla/wildflower-hall-shimla",
//       },
//       {
//         label: "Azaya Beach Resort Goa",
//         url: "/hotel-details/goa/azaya-beach-resort-goa",
//       },
//       {
//         label: "Four Seasons Hotel Mumbai",
//         url: "/hotel-details/mumbai/four-seasons-hotel-mumbai",
//       },
//       {
//         label: "Taj Fort Aguada Resort & Spa Goa",
//         url: "/hotel-details/goa/taj-fort-aguada-resort-spa-goa",
//       },
//       {
//         label: "ITC Maratha Mumbai",
//         url: "/hotel-details/mumbai/itc-maratha-mumbai",
//       },
//       {
//         label: "Park Hyatt Chennai",
//         url: "/hotel-details/chennai/park-hyatt-chennai",
//       },
//       {
//         label: "Sea Shell Havelock",
//         url: "/hotel-details/havelock/sea-shell-havelock",
//       },
//       {
//         label: "Spice Tree Munnar",
//         url: "/hotel-details/munnar/spice-tree-munnar",
//       },
//       {
//         label: "ITC Grand Bharat",
//         url: "/hotel-details/gurugram/itc-grand-bharat",
//       },
//       {
//         label: "St Regis Mumbai",
//         url: "/hotel-details/mumbai/st-regis-mumbai",
//       },
//       {
//         label: "Chennai Leela Palace",
//         url: "/hotel-details/chennai/chennai-leela-palace",
//       },
//       {
//         label: "Hyatt Regency Delhi",
//         url: "/hotel-details/delhi/hyatt-regency-delhi",
//       },
//       {
//         label: "Hyatt Grand Mumbai",
//         url: "/hotel-details/mumbai/hyatt-grand-mumbai",
//       },
//       {
//         label: "Goa Radisson Blu",
//         url: "/hotel-details/goa/goa-radisson-blu",
//       },
//       {
//         label: "Fariyas Hotel",
//         url: "/hotel-details/mumbai/fariyas-hotel",
//       },
//       {
//         label: "ITC Gardenia Bengaluru",
//         url: "/hotel-details/bengaluru/itc-gardenia-bengaluru",
//       },
//       {
//         label: "Kumarakom Lake Resort",
//         url: "/hotel-details/kumarakom/kumarakom-lake-resort",
//       },
//       {
//         label: "Taj Delhi Hotel",
//         url: "/hotel-details/delhi/taj-delhi-hotel",
//       },
//       {
//         label: "Surajkund Vivanta",
//         url: "/hotel-details/surajkund/surajkund-vivanta",
//       },
//       {
//         label: "JW Marriott Bangalore",
//         url: "/hotel-details/bangalore/jw-marriott-bangalore",
//       },
//       {
//         label: "Westin Goa",
//         url: "/hotel-details/goa/westin-goa",
//       },
//       {
//         label: "Trident Hotel Udaipur",
//         url: "/hotel-details/udaipur/trident-hotel-udaipur",
//       },
//       {
//         label: "Ritz Carlton Bangalore",
//         url: "/hotel-details/bangalore/ritz-carlton-bangalore",
//       },
//       {
//         label: "Taj Hotel Lucknow",
//         url: "/hotel-details/lucknow/taj-hotel-lucknow",
//       },
//       {
//         label: "Leela Kovalam",
//         url: "/hotel-details/kovalam/leela-kovalam",
//       },
//       {
//         label: "Trident Hotel Jaipur",
//         url: "/hotel-details/jaipur/trident-hotel-jaipur",
//       },
//     ],
//   },
// ];

// export default function MegaLinkSection() {
//   return (
//     <section
//       style={{
//         background: "#fff",
//         padding: "40px 10%",
//         borderTop: "1px solid #E5E7EB",
//       }}
//     >
//       <div className="container">
//         {LINK_GROUPS.map((group, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: 32,
//             }}
//           >
//             {group?.title && (
//               <h3
//                 style={{
//                   fontSize: 15,
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   marginBottom: 14,
//                   color: "#111827",
//                 }}
//               >
//                 {group.title}
//               </h3>
//             )}

//             <div
//               style={{
//                 lineHeight: 2.1,
//               }}
//             >
//               {group?.links?.map((item, i) => (
//                 <span key={i}>
//                   <Link
//                     href={item?.url || "#"}
//                     style={{
//                       color: "#374151",
//                       textDecoration: "none",
//                       fontSize: 15,
//                     }}
//                   >
//                     {item?.label}
//                   </Link>
//                   {i < group.links.length - 1 ? ", " : ""}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
