/* This component is responsible for the functionality of filtering by book category. This component is one
of the components employing something from bootstrap not in the videos: a checkbox form. Rather than making
custom css like Professor Hilton did in the video, I found from some research and help from AI that bootstrap
has the form-check class which can be used to house a checkbox in a div. Then, within that div, you can use
form-check-input and form-check-label to automatically style teh checkboxes nicely. Normally, that would also
left-align the text, but I think because of the way it was housed in the root element, which had text-align: center,
I had to use text-start on the div surrounding the form-check div.
*/

import { useEffect, useState } from "react";

function CategoryFilter({selectedCategories, setSelectedCategories, setPageNum}: {selectedCategories: string[]; setSelectedCategories: (categories: string[]) => void; setPageNum: (num: number) => void; })
{
    const [categories, setCategories] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://localhost:5000/api/Bookstore/GetBookCategories`);
                const data = await response.json();
                console.log('Fetched categories:', data)
                setCategories(data);
            }
            catch (error) {
                console.error('Error fetching categories:', error)
            }
        }

        fetchCategories();
    }, []);

    function handleCheckboxChange({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x !== target.value) : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);
        setPageNum(1);
    }

    return (
        <div>
            <h6 className="text-uppercase fw-bold text-muted mb-3">Book Categories</h6>
            {/* Div for centering text */}
            <div className="text-start">
                {/* Bootstrap div for housing a checkbox list, along with the form-check-input on the inputs */}
                {categories.map((c) => (
                    <div key={c} className="form-check">
                        <input 
                            type="checkbox" 
                            id={c} 
                            value={c}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                        />
                        {/* Bootstrap checkbox label */}
                        <label htmlFor={c} className="form-check-label">{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;