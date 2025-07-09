'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const Pack = () => {
    const [step, setStep] = useState(2); // You must initialize step
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [planError, setPlanError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        plan: "",
        billing: "",
    });

    const handlePlanSelect = (planName: string) => {
        setSelectedPlan(planName);
        setPlanError(null);
    };

    const handleNextStep = () => {
        if (!selectedPlan) {
            setPlanError("Please select a plan before continuing.");

            return;
        }
            setFormData({
                ...formData,
                plan: selectedPlan,
                billing: isYearly ? "yearly" : "monthly",
            });

        console.log("Form Data Saved:", {
            plan: selectedPlan,
            billing: isYearly ? "yearly" : "monthly",
        });
    };

    const plans = [
        {
            name: "Arcade",
            image: "/icon-arcade.svg",
            monthlyPrice: "$10/mo",
            yearlyPrice: "$100/yr",
        },
        {
            name: "Standard",
            image: "/icon-advanced.svg",
            monthlyPrice: "$20/mo",
            yearlyPrice: "$200/yr",
        },
        {
            name: "Premium",
            image: "/icon-pro.svg",
            monthlyPrice: "$30/mo",
            yearlyPrice: "$300/yr",
        },
    ];

    return (
        <div className='p-10'>
            {step === 2 && (
                <div>
                    <h2 className='text-3xl font-bold mb-2'>Select your plan</h2>
                    <p className='text-gray-700'>You have the option of monthly and yearly billing</p>

                    {/* Plan Cards */}
                    <div className='grid grid-cols-3 mt-10 gap-4'>
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                onClick={() => handlePlanSelect(plan.name)}
                                className={`border p-4 rounded-xl cursor-pointer transition 
                ${selectedPlan === plan.name ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}
                            >
                                <div className='flex flex-col items-start gap-4'>
                                    <Image src={plan.image} width={60} height={60} alt={plan.name} />
                                    <div>
                                        <h1 className='font-bold text-lg'>{plan.name}</h1>
                                        <p className='text-gray-600'>
                                            {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Error Message */}
                    {planError && <p className="text-red-500 mt-4">{planError}</p>}

                    {/* Toggle */}
                    <div className='flex items-center justify-center gap-4 mt-10'>
                        <span className={`${!isYearly ? 'font-bold text-black' : 'text-gray-500'}`}>Monthly</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isYearly}
                                onChange={() => setIsYearly(!isYearly)}
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                        <span className={`${isYearly ? 'font-bold text-black' : 'text-gray-500'}`}>Yearly</span>
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex justify-between mt-10'>
                        <button
                            className='bg-gray-400 text-white px-4 py-2 rounded'
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>
                        <button
                            className='bg-[#02295A] text-white px-6 py-2 rounded-md hover:bg-[#1D3E81]'
                            onClick={handleNextStep}

                        >
                            Next Step
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pack;
