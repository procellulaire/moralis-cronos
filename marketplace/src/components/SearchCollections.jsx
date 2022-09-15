import { Select } from 'antd';
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getCollectionsByChain } from "helpers/collections";
  
const customStyles = {           
    option: (base, state) => ({
      ...base,      
      color: "#1e2022",
      backgroundColor: "black",
      padding: ".5rem 3rem .5rem .5rem",
      cursor: "pointer",
    }),       
    singleValue: (provided, state) => {
      const opacity = 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

function SearchCollections({setInputValue}){
    const { Option } = Select;
    const { chainId } = useMoralisDapp();
    const NFTCollections = getCollectionsByChain(chainId);
    
    

    function onChange(value) {
        setInputValue(value);
    }

    return (
        <>
        <Select
            showSearch
            style={{width: "1000px",marginLeft: "20px",background:"#111827" }}
            //style={customStyles}
            placeholder="Find a Collection"
            optionFilterProp="children"
            onChange={onChange}
        >   
        {NFTCollections && 
            NFTCollections.map((collection, i) => 
            <Option value={collection.addrs} key= {i}>{collection.name}</Option>
            )
            }   
        </Select>
            
        </>
    )
}
export default SearchCollections;