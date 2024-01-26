import React, { useState } from 'react';
import NavigationBar from '../Navigation/NavigationBar';
import DietaryRestrictionsCard from './dietCardDisplay';
import { addDietaryRestriction, removeDietaryRestriction, clearDietaryRestrictions } from './dietRestrictionAPI';
import useProfileData from '../../hooks/useProfileData';

const DietaryRestrictions = () => {
    const { profileData, setProfileData } = useProfileData();
    const [selectedRestrictions, setSelectedRestrictions] = useState(profileData?.dietaryRestrictions || []);

    const restrictions = [
        'Gluten Free', 'Ketogenic', 'Vegetarian', 
        'Pescetarian', 'Vegan', 'Paleo', 'Low FODMAP', 'Whole30'
    ];

    const handleTagClick = (restriction) => {
        setSelectedRestrictions(prev => {
            if (prev.includes(restriction)) {
                return prev.filter(res => res !== restriction);
            } else {
                return [...prev, restriction];
            }
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await addDietaryRestriction(selectedRestrictions);
            if (response.dietaryRestrictions) {
                setProfileData({ ...profileData, dietaryRestrictions: response.dietaryRestrictions });
            }
        } catch (error) {
            console.error('Error updating restrictions:', error);
        }
    };

    const handleRemove = async () => {
        try {
            const response = await removeDietaryRestriction(selectedRestrictions);
            if (response.dietaryRestrictions) {
                setProfileData({ ...profileData, dietaryRestrictions: response.dietaryRestrictions });
            }
        } catch (error) {
            console.error('Error removing restrictions:', error);
        }
    };

    const handleClear = async () => {
        try {
            const response = await clearDietaryRestrictions();
            if (response.dietaryRestrictions) {
                setProfileData({ ...profileData, dietaryRestrictions: response.dietaryRestrictions });
            }
        } catch (error) {
            console.error('Error clearing restrictions:', error);
        }
    };

    return (
        <div className="min-h-screen">
            <NavigationBar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-4">Dietary Restrictions</h2>
                <div className="flex flex-wrap gap-4 mb-8">
                    {restrictions.map(restriction => (
                        <button 
                            key={restriction} 
                            onClick={() => handleTagClick(restriction)}
                            className={`py-2 px-4 rounded font-bold ${selectedRestrictions.includes(restriction) ? 'bg-green-600 hover:bg-green-700 text-red-400' : 'bg-gray-300 hover:bg-gray-400 text-white'}`}
                        >
                            {restriction}
                        </button>
                    ))}
                </div>
                <div className="flex space-x-4 mt-4">
                    <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Update Restrictions
                    </button>
                    <button onClick={handleRemove} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                        Remove Selected
                    </button>
                    <button onClick={handleClear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Clear All
                    </button>
                </div>
                <DietaryRestrictionsCard dietaryRestrictions={profileData?.dietaryRestrictions || []} />
            </div>
        </div>
    );
};

export default DietaryRestrictions;

