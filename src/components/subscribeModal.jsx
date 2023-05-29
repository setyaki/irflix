import { useState } from "react";
import { XCircle } from "@phosphor-icons/react";

const SubscribeModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform validation on the email format here
    // For simplicity, let's assume the email is valid
    setIsSubscribed(true);
  };

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center z-[10] bg-slate-900 bg-opacity-80" onClick={onClose}>
      <XCircle 
        size={32} 
        weight="fill" 
        onClick={onClose}
        className=" text-white absolute top-0 left-0 m-8 cursor-pointer"
        />
    </div>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[15]">
      <div className=" max-h-fit w-auto max-w-md flex flex-col bg-slate-300 text-slate-950 rounded-2xl lg:rounded-3xl p-8 mx-2">
        {!isSubscribed ? (
          <div className="flex flex-col gap-2 max-w-md">
            <h2 className="text-2xl font-bold mt-3 text-slate-950">Subscribe</h2>
            <p className="text-lg font-normal text-slate-950">Get to know the latest popular movies update</p>
                <div className="flex mt-4">
                    <form onSubmit={handleSubmit} className="flex flex-grow flex-wrap gap-3 items-start">
                        <input
                            className="flex flex-grow border border-gray-300 px-4 py-2 rounded-full w-auto mb-3"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        
                        <button
                            type="submit"
                            className="flex bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-full w-fit flex-grow justify-center"
                            >
                                Submit
                        </button>
                    </form>
                </div>
          </div>
        ) : (
          <div onClick={onClose}>
            <h2 className="text-2xl">Thank you for subscribing!</h2>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default SubscribeModal;
