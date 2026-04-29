import LoginForm from "@/modules/auth/components/LoginForm";

export default function Page() {
  return <LoginForm />;
}

// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function LoginPage() {
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // 🔥 SEND OTP
//   const handleSendOtp = async () => {
//     if (!mobile) return alert("Enter mobile");

//     setLoading(true);

//     try {
//       const res = await fetch(
//         "http://localhost:8000/api/v1/customer/auth/otp/send",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ mobile }),
//         },
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setStep(2);
//     } catch (err) {
//       alert(err.message);
//     }

//     setLoading(false);
//   };

//   // 🔥 VERIFY OTP
//   const handleVerifyOtp = async () => {
//     if (!otp) return alert("Enter OTP");

//     setLoading(true);

//     const res = await signIn("credentials", {
//       mobile,
//       otp,
//       redirect: false,
//     });

//     setLoading(false);

//     if (res.ok) {
//       window.location.href = "/";
//     } else {
//       alert(res.error);
//     }
//   };

//   // 🔥 GOOGLE LOGIN
  // const handleGoogleLogin = () => {
  //   signIn("google", { callbackUrl: "/" });
  // };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
//         <h2 className="text-2xl font-bold text-center mb-6">Login / Signup</h2>

//         {/* 🔹 STEP 1 */}
//         {step === 1 && (
//           <>
//             <input
//               type="text"
//               placeholder="Enter Mobile Number"
//               className="w-full border p-3 rounded-lg mb-4"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//             />

//             <button
//               onClick={handleSendOtp}
//               disabled={loading}
//               className="w-full bg-blue-600 text-white p-3 rounded-lg"
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {/* 🔹 STEP 2 */}
//         {step === 2 && (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               className="w-full border p-3 rounded-lg mb-4"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />

//             <button
//               onClick={handleVerifyOtp}
//               disabled={loading}
//               className="w-full bg-green-600 text-white p-3 rounded-lg"
//             >
//               {loading ? "Verifying..." : "Verify & Login"}
//             </button>

//             <button
//               onClick={() => setStep(1)}
//               className="text-sm text-gray-500 mt-2"
//             >
//               Change number
//             </button>
//           </>
//         )}

//         {/* 🔹 DIVIDER */}
//         <div className="my-6 text-center text-gray-400">OR</div>

//         {/* 🔥 GOOGLE LOGIN */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             width={20}
//           />
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// }
