import React from 'react';

const DietaryRestrictionsCard = ({ dietaryRestrictions }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h3 className="text-2xl font-semibold">Dietary Restrictions</h3>
            <ul className="list-disc pl-6 mt-4">
                {dietaryRestrictions.length > 0 ? (
                    dietaryRestrictions.map((restriction, index) => (
                        <li key={index}>{restriction}</li>
                    ))
                ) : (
                    <p>No dietary restrictions set.</p>
                )}
            </ul>
        </div>
    );
};

export default DietaryRestrictionsCard;
