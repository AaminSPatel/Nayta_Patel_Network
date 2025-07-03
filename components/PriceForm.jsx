"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Plus, Trash2 } from "lucide-react"
import { usePatel } from "./patelContext"

export default function PriceForm({ onCancel }) {
  const [mandiData, setMandiData] = useState({
    mandiName: "",
    mandiLocation: "",
    state: "",
    intro: "",
    prices: {
      grain: {},
      vegetable: {},
      flower: {},
    }
  })
  const {path} = usePatel()

  const [newCategory, setNewCategory] = useState("")
  const [newItem, setNewItem] = useState("")
  const [newVariety, setNewVariety] = useState("")
  const [priceFields, setPriceFields] = useState({ minPrice: "", maxPrice: "", currentPrice: "" })

  const categoryItems = {
    vegetable: ["aalu", "lahsun","pyaj", "new_pyaj"],
    grain: ["gehu", "chana","soyabean"],
    flower: ["genda", "noranga"]
  };

  const itemsWithVarieties = {
    potato: [ "lr_aalu", "jyoti_aalu", "safed_aalu"],
    garlic: ["desi_lahsun", "uti_lahsun"],
    gram: ["daler_chana", "bitki_chana"],
  }

  const handleBasicChange = (e) => {
    const { name, value } = e.target
    setMandiData((prev) => ({ ...prev, [name]: value }))
  }

 const addVariety = () => {
  if (!newCategory || !newItem) return;
  
  // Validate the item exists in the schema
  if (!categoryItems[newCategory]?.includes(newItem)) {
    alert("Invalid item for this category");
    return;
  }

  // Validate variety if needed
  if (itemsWithVarieties[newItem] && !newVariety) {
    alert("Please select a variety for this item");
    return;
  }

  // Validate currentPrice (required field)
  if (!priceFields.currentPrice) {
    alert("Current price is required");
    return;
  }

  setMandiData((prev) => {
    const updated = JSON.parse(JSON.stringify(prev));
    
    if (!updated.prices[newCategory]) updated.prices[newCategory] = {};
    
    if (itemsWithVarieties[newItem]) {
      if (!updated.prices[newCategory][newItem]) {
        updated.prices[newCategory][newItem] = {};
      }
      updated.prices[newCategory][newItem][newVariety] = {
        minPrice: Number(priceFields.minPrice) || undefined,
        maxPrice: Number(priceFields.maxPrice) || undefined,
        currentPrice: Number(priceFields.currentPrice)
      };
    } else {
      updated.prices[newCategory][newItem] = {
        minPrice: Number(priceFields.minPrice) || undefined,
        maxPrice: Number(priceFields.maxPrice) || undefined,
        currentPrice: Number(priceFields.currentPrice)
      };
    }

    return updated;
  });

  // Reset form
  setNewVariety("");
  setPriceFields({ minPrice: "", maxPrice: "", currentPrice: "" });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Initialize the prices object with the exact structure from your schema
    const prices = {
      grain: {
        gehu: null,
        chana: {
          daler_chana: null,
          bitki_chana: null,
        },
        soyabean: null,
      },
      vegetable: {
        pyaj: null,
        new_pyaj: null,
        lahsun: {
          desi_lahsun: null,
          uti_lahsun: null
        },
        aalu: {
          safed_aalu: null,
          lr_aalu: null,
          jyoti_aalu: null,
        }
      },
      flower: {
        genda: null,
        noranga: null
      }
    };

    // Map the form data to the schema structure
    Object.entries(mandiData.prices).forEach(([category, items]) => {
      if (!prices[category]) return;

      Object.entries(items).forEach(([item, priceData]) => {
        // Check if this is an item with varieties
        if (item in itemsWithVarieties) {
          Object.entries(priceData).forEach(([variety, prices]) => {
            if (prices[category][item] && prices[category][item][variety]) {
              prices[category][item][variety] = {
                minPrice: Number(prices.minPrice) || undefined,
                maxPrice: Number(prices.maxPrice) || undefined,
                currentPrice: Number(prices.currentPrice) || 0 // required field
              };
            }
          });
        } else if (prices[category][item]) {
          prices[category][item] = {
            minPrice: Number(priceData.minPrice) || undefined,
            maxPrice: Number(priceData.maxPrice) || undefined,
            currentPrice: Number(priceData.currentPrice) || 0 // required field
          };
        }
      });
    });

    // Prepare the final data object
    const dataToSend = {
      mandiName: mandiData.mandiName,
      mandiLocation: mandiData.mandiLocation,
      state: mandiData.state,
      intro: mandiData.intro,
      prices: prices
    };

    console.log('Data being sent:', JSON.stringify(dataToSend, null, 2));
  const token = localStorage.getItem('token');

    const res = await fetch(path +"/api/prices", {
      method: "POST",
headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        } ,
             body: JSON.stringify(dataToSend)
    });

    const responseData = await res.json();
    
    if (!res.ok) {
      throw new Error(responseData.message || "Failed to submit");
    }

    //alert("Price entry saved successfully!");
   // onCancel();
  } catch (err) {
    console.error("Submission error:", err);
   // alert("Error: " + (err.message || "Failed to save prices"));
  }
};
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Add Mandi Prices</h3>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["mandiName", "mandiLocation", "state"].map((field) => (
            <div key={field}>
              <label className="form-label capitalize">{field.replace("mandi", "Mandi ")}</label>
              <input
                type="text"
                name={field}
                value={mandiData[field]}
                onChange={handleBasicChange}
                className="form-input"
                required
              />
            </div>
          ))}
        </div>

        <div>
          <label className="form-label">Intro (Hindi)</label>
          <textarea
            name="intro"
            value={mandiData.intro}
            onChange={handleBasicChange}
            className="form-input min-h-[100px]"
            placeholder="आज मंडी में भाव कुछ इस प्रकार हैं..."
            required
          />
        </div>

        <div className="border-t pt-6">
          <h4 className="text-lg font-medium mb-4">Add Price Details</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              className="form-input"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value)
                setNewItem("")
                setNewVariety("")
              }}
              required
            >
              <option value="">Select Category</option>
              {Object.keys(categoryItems).map((cat) => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>

            <select
              className="form-input"
              value={newItem}
              onChange={(e) => {
                setNewItem(e.target.value)
                setNewVariety("")
              }}
              disabled={!newCategory}
              required
            >
              <option value="">Select Item</option>
              {newCategory &&
                categoryItems[newCategory].map((item) => (
                  <option key={item} value={item} className="capitalize">
                    {item.replace(/_/g, " ")}
                  </option>
                ))}
            </select>

            {newItem && itemsWithVarieties[newItem] && (
              <select
                className="form-input"
                value={newVariety}
                onChange={(e) => setNewVariety(e.target.value)}
                required={itemsWithVarieties[newItem]?.length > 0}
              >
                <option value="">Select Variety</option>
                {itemsWithVarieties[newItem].map((variety) => (
                  <option key={variety} value={variety} className="capitalize">
                    {variety.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Min Price"
              className="form-input"
              value={priceFields.minPrice}
              onChange={(e) => setPriceFields({ ...priceFields, minPrice: e.target.value })}
              
            />
            <input
              type="number"
              placeholder="Max Price"
              className="form-input"
              value={priceFields.maxPrice}
              onChange={(e) => setPriceFields({ ...priceFields, maxPrice: e.target.value })}
              
            />
            <input
              type="number"
              placeholder="Current Price"
              className="form-input"
              value={priceFields.currentPrice}
              onChange={(e) => setPriceFields({ ...priceFields, currentPrice: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={addVariety}
              className="btn btn-outline flex items-center gap-2"
            >
              <Plus size={16} /> Add Variety
            </button>
          </div>
        </div>

        <div className="pt-4">
          <h5 className="font-semibold mb-2">Preview</h5>
          <pre className="bg-gray-50 p-4 rounded max-h-60 overflow-auto text-sm border">
            {JSON.stringify(mandiData.prices, null, 2)}
          </pre>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Entry
          </button>
        </div>
      </form>
    </motion.div>
  )
}