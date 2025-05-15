"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, Eye } from "lucide-react";
import { usePatel } from "./patelContext"; // fetching { prices, formatDate } from context
import { useState } from "react";


const UpdatePriceModal = ({ price, onClose, onUpdate }) => {
  // Initialize form data with proper nested structure
  const [formData, setFormData] = useState({
    mandiName: price.mandiName || '',
    mandiLocation: price.mandiLocation || '',
    state: price.state || '',
    intro: price.intro || '',
    prices: {
      grain: {
        wheat: price.prices?.grain?.wheat || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        gram: {
          daler_gram: price.prices?.grain?.gram?.daler_gram || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
          bitki_gram: price.prices?.grain?.gram?.bitki_gram || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
          kala_gram: price.prices?.grain?.gram?.kala_gram || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
          new_gram: price.prices?.grain?.gram?.new_gram || { minPrice: 0, maxPrice: 0, currentPrice: 0 }
        },
        alsi: price.prices?.grain?.alsi || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        mungfali: price.prices?.grain?.mungfali || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        soyabean: price.prices?.grain?.soyabean || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        sarso: price.prices?.grain?.sarso || { minPrice: 0, maxPrice: 0, currentPrice: 0 }
      },
      vegetable: {
        onion: price.prices?.vegetable?.onion || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        new_onion: price.prices?.vegetable?.new_onion || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        tomato: price.prices?.vegetable?.tomato || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        dhaniya: price.prices?.vegetable?.dhaniya || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        garlic: {
          desi_garlic: price.prices?.vegetable?.garlic?.desi_garlic || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
          uti_garlic: price.prices?.vegetable?.garlic?.uti_garlic || { minPrice: 0, maxPrice: 0, currentPrice: 0 }
        },
        potato: {
          new_potato: price.prices?.vegetable?.potato?.new_potato || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
          lr_potato: price.prices?.vegetable?.potato?.lr_potato || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
          atl_potato: price.prices?.vegetable?.potato?.atl_potato || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
          jyoti_potato: price.prices?.vegetable?.potato?.jyoti_potato || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
          pukhraj_potato: price.prices?.vegetable?.potato?.pukhraj_potato || { minPrice: 0, maxPrice: 0, currentPrice: 0 }
        }
      },
      dairy: {
        ghee: price.prices?.dairy?.ghee || { minPrice: 0, maxPrice: 0, currentPrice: 0 },
        mava: price.prices?.dairy?.mava || { minPrice: 0, maxPrice: 0, currentPrice: 0 }
      },
      oil: {
        soyabeanOil: price.prices?.oil?.soyabeanOil || { minPrice: 0, maxPrice: 0, currentPrice: 0 }
      },
      others: {
        sugar: price.prices?.others?.sugar || { minPrice: 0, maxPrice: 0, currentPrice: 0 }
      }
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState('grain'); // Default to first category
  const { updatePrice } = usePatel();

  // Handle changes for nested price fields
  const handlePriceChange = (category, subCategory, field, priceType, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (subCategory) {
        newData.prices[category][subCategory][field][priceType] = Number(value) || 0;
      } else {
        newData.prices[category][field][priceType] = Number(value) || 0;
      }
      
      return newData;
    });
  };

  // Handle changes for regular fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic field validation
    if (!formData.mandiName.trim()) newErrors.mandiName = 'Mandi name is required';
    if (!formData.mandiLocation.trim()) newErrors.mandiLocation = 'Location is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    // Price validation
    const validatePriceDetails = (priceDetails, path) => {
      if (isNaN(priceDetails.currentPrice)) {
        newErrors[`${path}.currentPrice`] = 'Current price must be a number';
      }
      if (priceDetails.minPrice && isNaN(priceDetails.minPrice)) {
        newErrors[`${path}.minPrice`] = 'Min price must be a number';
      }
      if (priceDetails.maxPrice && isNaN(priceDetails.maxPrice)) {
        newErrors[`${path}.maxPrice`] = 'Max price must be a number';
      }
    };

    // Recursively validate all prices
    Object.entries(formData.prices).forEach(([category, items]) => {
      Object.entries(items).forEach(([item, value]) => {
        if (value && typeof value === 'object' && value.currentPrice !== undefined) {
          // Simple price object
          validatePriceDetails(value, `prices.${category}.${item}`);
        } else if (value && typeof value === 'object') {
          // Nested subcategory
          Object.entries(value).forEach(([subItem, subValue]) => {
            validatePriceDetails(subValue, `prices.${category}.${item}.${subItem}`);
          });
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    try {
      await updatePrice(price._id, formData);
      onUpdate(); // Notify parent of successful update
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      setErrors({ 
        submit: error.response?.data?.message || 'Failed to update prices. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to render price inputs for a given item
  const renderPriceInputs = (category, item, subItem = null) => {
    const path = subItem ? `${category}.${item}.${subItem}` : `${category}.${item}`;
    const priceDetails = subItem 
      ? formData.prices[category][item][subItem]
      : formData.prices[category][item];

    return (
      <div key={path} className="bg-gray-50 p-3 rounded mb-3">
        <h4 className="font-medium mb-2 capitalize">
          {subItem ? subItem.replace(/_/g, ' ') : item.replace(/_/g, ' ')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Current Price (₹)</label>
            <input
              type="number"
              value={priceDetails.currentPrice}
              onChange={(e) => handlePriceChange(
                category, 
                subItem ? item : null, 
                subItem || item, 
                'currentPrice', 
                e.target.value
              )}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              step="0.01"
            />
            {errors[`prices.${path}.currentPrice`] && (
              <p className="text-red-500 text-xs mt-1">{errors[`prices.${path}.currentPrice`]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Min Price (₹)</label>
            <input
              type="number"
              value={priceDetails.minPrice || ''}
              onChange={(e) => handlePriceChange(
                category, 
                subItem ? item : null, 
                subItem || item, 
                'minPrice', 
                e.target.value
              )}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              step="0.01"
            />
            {errors[`prices.${path}.minPrice`] && (
              <p className="text-red-500 text-xs mt-1">{errors[`prices.${path}.minPrice`]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max Price (₹)</label>
            <input
              type="number"
              value={priceDetails.maxPrice || ''}
              onChange={(e) => handlePriceChange(
                category, 
                subItem ? item : null, 
                subItem || item, 
                'maxPrice', 
                e.target.value
              )}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              step="0.01"
            />
            {errors[`prices.${path}.maxPrice`] && (
              <p className="text-red-500 text-xs mt-1">{errors[`prices.${path}.maxPrice`]}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render all items in the active category
  const renderActiveCategory = () => {
    const categoryItems = formData.prices[activeCategory];
    
    return (
      <div className="mt-4">
        {Object.entries(categoryItems).map(([item, value]) => {
          if (value && typeof value === 'object' && value.currentPrice !== undefined) {
            // Simple price object
            return renderPriceInputs(activeCategory, item);
          } else if (value && typeof value === 'object') {
            // Nested subcategory
            return (
              <div key={item} className="mb-6">
                <h3 className="text-md font-medium mb-3 capitalize">{item.replace(/_/g, ' ')}</h3>
                <div className="pl-4 border-l-2 border-gray-200">
                  {Object.keys(value).map(subItem => 
                    renderPriceInputs(activeCategory, item, subItem)
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Update Market Prices</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 text-2xl"
              disabled={isSubmitting}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mandi Name*</label>
                <input
                  type="text"
                  name="mandiName"
                  value={formData.mandiName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.mandiName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.mandiName && <p className="text-red-500 text-sm mt-1">{errors.mandiName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                <input
                  type="text"
                  name="mandiLocation"
                  value={formData.mandiLocation}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.mandiLocation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.mandiLocation && <p className="text-red-500 text-sm mt-1">{errors.mandiLocation}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
                <textarea
                  name="intro"
                  value={formData.intro}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Commodity Prices</h3>
              
              {/* Category tabs */}
              <div className="flex overflow-x-auto pb-2 mb-4">
                {Object.keys(formData.prices).map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 mr-2 rounded-t-lg capitalize ${activeCategory === category ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Active category content */}
              {renderActiveCategory()}
            </div>

            {errors.submit && (
              <div className="mt-4">
                <p className="text-red-500 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Prices'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default function PriceTable() {
  const { prices, formatDate, updatePrice  } = usePatel();
  const [selectedPrice, setSelectedPrice] = useState(null);
//console.log(prices,'Prices');

const handleEditClick = (price) => {
  setSelectedPrice(price);
};

const handleUpdate = async (id, updatedData) => {
  await updatePrice(id, updatedData);
};

  return (
    <>
    <motion.div
      className="table-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <table className="admin-table w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2">Mandi Name</th>
            <th scope="col" className="px-4 py-2">Location</th>
            <th scope="col" className="px-4 py-2">Date</th>
            <th scope="col" className="px-4 py-2">Intro</th>
            <th scope="col" className="px-4 py-2">Prices</th>
            <th scope="col" className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prices.length > 0 ? (
            prices.map((price) => (
              <tr key={price._id}>
                <td className="px-4 py-2 font-medium text-gray-900">{price.mandiName}</td>
                <td className="px-4 py-2">{price.mandiLocation}</td>
                <td className="px-4 py-2">{formatDate(price.date)}</td>
                <td className="px-4 py-2 max-w-32 overflow-hidden">{price.intro || "-"}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-col gap-1">
                    {/* {Object.entries(price.prices).map(([key, value]) => (
                      <span key={key} className="text-xs capitalize">
                        {key}: ₹{value}
                      </span>
                    ))} */}
                  </div>
                </td>
                <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(price)} 
                        className="p-1 text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-400">
                No prices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
    
    {selectedPrice && (
      <UpdatePriceModal
        price={selectedPrice}
        onClose={() => setSelectedPrice(null)}
        onUpdate={handleUpdate}
      />
    )}
    </>
  );
}
