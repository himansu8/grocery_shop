import React from 'react'

function CreateCategoryForm({ handleSubmit, value, setValue }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="mb-3">
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green"
                    placeholder="Enter new category"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-green hover:bg-[#0ab538] text-white font-semibold rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-green"
            >
                Submit
            </button>
        </form>
    )
}

export default CreateCategoryForm