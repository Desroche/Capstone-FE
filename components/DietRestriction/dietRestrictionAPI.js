const addDietaryRestriction = async (restriction) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/auth/user/profile/addRestriction`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ dietaryRestrictions: restriction })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error adding dietary restriction:', error);
        throw error;
    }
};

const removeDietaryRestriction = async (restriction) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/auth/user/profile/removeRestriction`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ dietaryRestrictions: restriction })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error removing dietary restriction:', error);
        throw error;
    }
};

const clearDietaryRestrictions = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/auth/user/profile/clearRestriction`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error clearing dietary restrictions:', error);
        throw error;
    }
};

export { addDietaryRestriction, removeDietaryRestriction, clearDietaryRestrictions };
