"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

const MultiForm = () => {
    const [step, setStep] = useState(1);
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [planError, setPlanError] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({
        FullName: "",
        email: "",
        PhoneNbr: "",
        plan: "",
        billing: "",
    });

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

        setStep(3); // step 3 ma jane
    };

    return (
        <div className='flex bg-white justify-center items-center p-8 mt-40'>
            <div className="bg-white rounded-xl shadow-2xl flex w-[900px] overflow-hidden">
                {/* Sidebar */}
                <div className="relative w-1/3 p-6">
                    <Image
                        src="/bg-sidebar-desktop.svg"
                        alt="side image"
                        width={1}
                        height={1}
                        className='h-full w-full'
                    />
                    <div className="absolute top-0 left-0 z-10 p-10 text-white space-y-6 mt-3">
                        {["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"].map((label, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i + 1 === step ? 'bg-blue-300 text-black' : 'border border-white text-black'}`}>
                                    {i + 1}
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-white">Step {i + 1}</p>
                                    <p className="font-bold uppercase">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content area */}
                <div className='w-2/3 p-8'>
                    {step === 1 && (
                        <>
                            <h2 className='font-bold text-4xl'>Personal Info</h2>
                            <p>Please provide your name, email, and phone number</p>

                            <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                                {/* Full Name */}
                                <label className='block text-black text-xl font-bold mb-2' htmlFor='FullName'>
                                    Name:
                                </label>
                                <input
                                    id="FullName"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                    {...register("FullName", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 4,
                                            message: "Minimum 4 characters required"
                                        },
                                    })}
                                    placeholder='Pramod Ghimire'
                                />
                                {errors.FullName && <p className="text-red-500">{errors.FullName.message}</p>}

                                {/* Email */}
                                <label className='block text-black text-xl font-bold mt-3' htmlFor='email'>
                                    Email:
                                </label>
                                <input
                                    id="email"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Enter a valid email address"
                                        },
                                    })}
                                    placeholder='example@gmail.com'
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                                {/* Phone */}
                                <label className='block text-black text-xl font-bold mt-3' htmlFor='PhoneNbr'>
                                    Phone-no:
                                </label>
                                <input
                                    id="PhoneNbr"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                    {...register("PhoneNbr", {
                                        required: "Phone number is required",
                                        minLength: { value: 10, message: "Phone number must be at least 10 digits" },
                                    })}
                                    placeholder='9840768966'
                                />
                                {errors.PhoneNbr && <p className="text-red-500">{errors.PhoneNbr.message}</p>}

                                <div className="mt-10 text-right">
                                    <button type="submit" className="bg-[#02295A] text-white px-6 py-2 rounded-md hover:bg-[#1D3E81] cursor-pointer mt-10">
                                        Next Step
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className='text-3xl font-bold'>Select your plan</h2>
                            <p className='mt-2 text-gray-700'>You have the option of the monthly and yearly pack</p>

                            {/* Cards */}
                            <div className="grid grid-cols-3 mt-10 gap-3">
                                {plans.map((plan, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handlePlanClick(plan.name)}
                                        className={`border p-4 rounded-xl cursor-pointer transition 
                      ${selectedPlan === plan.name ? 'border-blue-500 bg-blue-100' : 'hover:border-blue-300'}`}
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

                            {/* Validation Error */}
                            {planError && <p className='text-red-500 mt-4'>{planError}</p>}

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
                                    className='bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500'
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
            </div>
        </div>
    );
};

export default MultiForm;
