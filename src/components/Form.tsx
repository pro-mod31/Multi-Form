"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

const MultiForm = () => {
    const [step, setStep] = useState(1);
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [planError, setPlanError] = useState<string | null>(null);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [addOnError, setAddOnError] = useState<string | null>(null);

    const [formData, setFormData] = useState<any>({
        FullName: "",
        email: "",
        PhoneNbr: "",
        plan: "",
        billing: "",
        addons: [],
    });

    const addOns = [
        {
            id: "1",
            name: "Online Services",
            desc: "Access the Multiplayer games",
            monthlyprice: "2",
            yearlyprice: "3",
        },
        {
            id: "2",
            name: "Larger Storage",
            desc: "Extra 1TB of the cloud save",
            monthlyprice: "2",
            yearlyprice: "3",
        },
        {
            id: "3",
            name: "Customized Profile",
            desc: "Custom theme of profile",
            monthlyprice: "2",
            yearlyprice: "3",
        },
    ];

    const plans = [
        {
            id: "1",
            name: "Arcade",
            image: "/icon-arcade.svg",
            monthlyPrice: "$10/mo",
            yearlyPrice: "$100/yr",
        },
        {
            id: "2",
            name: "Standard",
            image: "/icon-advanced.svg",
            monthlyPrice: "$20/mo",
            yearlyPrice: "$200/yr",
        },
        {
            id: "3",
            name: "Premium",
            image: "/icon-pro.svg",
            monthlyPrice: "$30/mo",
            yearlyPrice: "$300/yr",
        },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            FullName: "",
            email: "",
            PhoneNbr: "",
        },
    });

    const onSubmit = (data: any) => {
        setFormData({ ...formData, ...data });
        setStep(2);
    };

    const handlePlanClick = (planName: string) => {
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
            billing: isYearly ? "Yearly" : "Monthly",
        });

        setStep(3);
    };

    const handleCheckboxChange = (name: string) => {
        setSelectedAddOns((prev) =>
            prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
        );
    };

    const handleAddOnNext = () => {
        // No strict validation here; optional add-ons
        setAddOnError(null);

        setFormData({
            ...formData,
            addons: selectedAddOns,
        });

        setStep(4);
    };

    const handleConfirm = () => {
        setStep(5);
    };

    // Price calculation
    const selectedPlanDetails = plans.find(plan => plan.name === formData.plan);
    const selectedAddOnDetails = addOns.filter(addOn => selectedAddOns.includes(addOn.name));

    const basePrice = selectedPlanDetails
        ? parseInt(isYearly ? selectedPlanDetails.yearlyPrice.replace(/\D/g, '') : selectedPlanDetails.monthlyPrice.replace(/\D/g, ''))
        : 0;

    const addOnTotal = selectedAddOnDetails.reduce(
        (sum, addOn) => sum + parseInt(isYearly ? addOn.yearlyprice : addOn.monthlyprice),
        0
    );

    const totalPrice = basePrice + addOnTotal;

    return (
        <div className="flex bg-white justify-center items-center px-4 md:p-8 mt-10 md:mt-40">
            <div className="bg-white rounded-xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
                <div className="relative w-full md:w-1/3">
                    <Image
                        src="/bg-sidebar-desktop.svg"
                        alt="Sidebar desktop"
                        width={1}
                        height={1}
                        className="hidden md:block w-full object-cover"
                    />
                    <Image
                        src="/bg-sidebar-mobile.svg"
                        alt="Sidebar mobile"
                        width={1}
                        height={1}
                        className="block md:hidden w-full h-[200px] object-cover"
                    />

                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-0 z-10 p-6 md:p-10 text-white w-full md:w-auto md:h-full">
                        <div className="flex justify-center md:flex-col md:justify-start md:space-y-6 space-x-6 md:space-x-0">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                    key={num}
                                    className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4"
                                >
                                    {/* Number Circle */}
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === num
                                                ? "bg-blue-300 text-black"
                                                : "border border-white text-white"
                                            }`}
                                    >
                                        {num}
                                    </div>

                                    {/* Text block - visible only on md and up */}
                                    <div className="hidden md:block">
                                        <p className="text-xs uppercase text-white mb-1">Step {num}</p>
                                        <p className="font-bold uppercase text-sm">
                                            {["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY", "THANK YOU"][
                                                num - 1
                                            ]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="w-full md:w-2/3 p-6 md:p-10">
                    {step === 1 && (
                        <>
                            <h2 className="text-2xl md:text-3xl font-bold">Personal Info</h2>
                            <p className="mt-2 text-gray-600">Please provide your name, email, and phone number</p>

                            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                                <label className="block text-black text-sm font-bold mb-1" htmlFor="FullName">Name:</label>
                                <input
                                    id="FullName"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                    {...register("FullName", {
                                        required: "Full name is required",
                                        minLength: { value: 4, message: "Minimum 4 characters required" },
                                    })}
                                    placeholder="Pramod Ghimire"
                                />
                                {errors.FullName && <p className="text-red-500 text-sm mt-1">{errors.FullName.message}</p>}

                                <label className="block text-black text-sm font-bold mt-4" htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Enter a valid email address",
                                        },
                                    })}
                                    placeholder="example@gmail.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                                <label className="block text-black text-sm font-bold mt-4" htmlFor="PhoneNbr">Phone-no:</label>
                                <input
                                    id="PhoneNbr"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                    {...register("PhoneNbr", {
                                        required: "Phone number is required",
                                        minLength: { value: 10, message: "Phone number must be at least 10 digits" },
                                    })}
                                    placeholder="9840768966"
                                />
                                {errors.PhoneNbr && <p className="text-red-500 text-sm mt-1">{errors.PhoneNbr.message}</p>}

                                <div className="mt-8 text-right">
                                    <button type="submit" className="bg-[#02295A] text-white px-6 py-2 rounded-md hover:bg-[#1D3E81] cursor-pointer">
                                        Next Step
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {/* Step 2: Select Plan */}
                    {step === 2 && (
                        <div>
                            <h2 className='text-3xl font-bold'>Select your plan</h2>
                            <p className='mt-2 text-gray-700'>You have the option of the monthly and yearly pack</p>

                            <div className="grid grid-cols-3 mt-10 gap-3">
                                {plans.map((plan, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handlePlanClick(plan.name)}
                                        className={`border p-4 rounded-xl cursor-pointer transition ${selectedPlan === plan.name ? 'border-blue-500 bg-blue-100' : 'hover:border-blue-300'}`}
                                    >
                                        <div className='flex flex-col items-start gap-4'>
                                            <Image src={plan.image} width={60} height={60} alt={plan.name} />
                                            <div>
                                                <h1 className='font-bold text-lg'>{plan.name}</h1>
                                                <p className='text-gray-600'>{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {planError && <p className='text-red-500 mt-4'>{planError}</p>}

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

                            <div className='flex justify-between mt-10'>
                                <button className='bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500' onClick={() => setStep(1)}>Back</button>
                                <button className='bg-[#02295A] text-white px-6 py-2 rounded-md hover:bg-[#1D3E81]' onClick={handleNextStep}>Next Step</button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Add-ons */}
                    {step === 3 && (
                        <div className="p-8 max-w-xl mx-auto">
                            <h2 className="text-2xl font-bold mb-2">Pick add-ons</h2>
                            <p className="text-gray-500 mb-6">Add-ons help enhance your gaming experience.</p>

                            {addOns.map((addOn) => (
                                <label key={addOn.name} className={`flex items-center justify-between border rounded-lg p-4 mb-4 cursor-pointer ${selectedAddOns.includes(addOn.name) ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>
                                    <div className="flex items-start gap-3">
                                        <input type="checkbox" checked={selectedAddOns.includes(addOn.name)} onChange={() => handleCheckboxChange(addOn.name)} className="mt-1" />
                                        <div>
                                            <p className="font-bold">{addOn.name}</p>
                                            <p className="text-sm text-gray-500">{addOn.desc}</p>
                                        </div>
                                    </div>
                                    <p className="text-blue-600">+${isYearly ? addOn.yearlyprice : addOn.monthlyprice}/{isYearly ? "yr" : "mo"}</p>
                                </label>
                            ))}

                            {addOnError && <p className="text-red-500 mt-2">{addOnError}</p>}

                            <div className="flex justify-between mt-6">
                                <button className="text-gray-500 p-3 " onClick={() => setStep(2)}>Back</button>
                                <button className="bg-blue-900 text-white px-6 py-2 rounded-md" onClick={handleAddOnNext}>Next Step</button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Summary */}
                    {step === 4 && (
                        <div className=" p-8 ">
                            <h2 className="text-2xl font-bold mb-2">Finishing up</h2>
                            <p className="text-gray-500 mb-6">Double-check everything looks OK before confirming.</p>

                            <div className="bg-gray-100 p-4 rounded-md">
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <p className="font-bold">{formData.plan} ({formData.billing})</p>
                                        <button className="text-blue-600 underline text-sm" onClick={() => setStep(2)}>Change</button>
                                    </div>
                                    <p className="font-bold">${basePrice}/{isYearly ? "yr" : "mo"}</p>
                                </div>
                                <hr className="my-2" />
                                {selectedAddOnDetails.map((addOn) => (
                                    <div key={addOn.name} className="flex justify-between text-gray-600 mb-1">
                                        <p>{addOn.name}</p>
                                        <p>+${isYearly ? addOn.yearlyprice : addOn.monthlyprice}/{isYearly ? "yr" : "mo"}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between p-4">
                                <p className="text-gray-600">Total (per {isYearly ? "year" : "month"})</p>
                                <p className="font-bold text-blue-600 text-lg">${totalPrice}</p>
                            </div>

                            <div className="flex justify-between mt-6">
                                <button className="text-gray-500" onClick={() => setStep(3)}>Go Back</button>
                                <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600" onClick={handleConfirm}>Confirm</button>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Thank You */}
                    {step === 5 && (
                        <div className="text-center p-10">
                            <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
                            <p className="text-gray-700 mb-6">Your subscription has been confirmed.</p>
                            <p className="text-gray-500">We have emailed you the details of your subscription.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default MultiForm;



