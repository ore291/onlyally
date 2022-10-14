import { useRef, useState, useMemo } from "react";
import RangeSlider from "./RangeSlider";
import { FaCheckCircle } from "react-icons/fa";
import { MdLocationOn, MdImage } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BiCaretDown } from "react-icons/bi";
import Dropdown from "./Dropdown";

const FilterSearch = () => {
  const allVerifiedVals = [
    { id: 0, value: "All" },
    { id: 1, value: "Verified" },
    { id: 2, value: "Unverified" },
  ];
  const allStatusVals = [
    { id: 0, value: "All" },
    { id: 1, value: "Online" },
    { id: 2, value: "Offline" },
  ];
  const allGenderVals = [
    { id: 0, value: "All" },
    { id: 1, value: "Female" },
    { id: 2, value: "Male" },
  ];
  const allAvatarVals = [
    { id: 0, value: "All" },
    { id: 1, value: "Yes" },
    { id: 2, value: "No" },
  ];

  const allAgeVals = [
    { id: 0, value: "Yes" },
    { id: 1, value: "No" },
  ];

  const [selectedVerified, setSelectedVerified] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedGender, setSelectedGender] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedAge, setSelectedAge] = useState(1);

  const inputRef = useRef();
  const inputWidth = () => {
    var inputVal = inputRef.current;

    if (inputVal.value.length > 0) {
      inputVal.style.width = (inputVal.value.length + 1) * 20 + "px";
    } else {
      inputVal.style.width = "175px";
    }
  };
  return (
    <div className="p-5 my-3 lg:my-6  bg-white dark:!bg-gray-900 dark:!text-gray-400  rounded-xl shadow-md outline-none">
      <div className="row-container mt-3 mx-0 mb-6 break-words filter-search">
        <input
          ref={inputRef}
          onChange={inputWidth}
          type="text"
          className="text-center dark:text-gray-200 placeholder:text-gray-400 placeholder:font-semibold placeholder:text-2xl lg:placeholder:text-4xl px-2 w-[175px] text-lg md:text-3xl  !max-w-[250px] lg:!max-w-[700px]  break-words overflow-visible m-0 !outline-none focus:ring-0 outline-offset-0"
          name="query"
          id="query"
          placeholder="Keyword"
          autoComplete="off"
        />
        <button
          type="submit"
          className="filter-btn row-container bg-lightPlayRed outline-none text-white"
          title="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-center  mt-4 lg:space-x-3">
        <div className="search-filter-dropdown ">
          <MdLocationOn className="absolute m-0 w-4 h-4 align-middle overflow-hidden left-2 top-2 text-lightPlayRed" />
          <BiCaretDown
            className="w-4 h-4 m-0 top-2 right-[15px] lg:right-2 absolute"
            aria-hidden="true"
          />
          <select
            defaultValue={0}
            name="country"
            id="country"
            className="w-[98.5%] pr-5  appearance-none form-select lg:w-[125px] h-[32px] text-xs outline-none focus:outline-none focus:ring-0 border-0 lg:pr-[25px] lg:pl-[5px]  ring-0 rounded-full cursor-pointer indent-[27px] bg-transparent font-medium "
          >
            <option value="all">All Country</option>
            <option value="0">Select Country</option>
            <option value="1">United States</option>
            <option value="2">Canada</option>
            <option value="3">Afghanistan</option>
            <option value="4">Albania</option>
            <option value="5">Algeria</option>
            <option value="6">American Samoa</option>
            <option value="7">Andorra</option>
            <option value="8">Angola</option>
            <option value="9">Anguilla</option>
            <option value="10">Antarctica</option>
            <option value="11">Antigua and/or Barbuda</option>
            <option value="12">Argentina</option>
            <option value="13">Armenia</option>
            <option value="14">Aruba</option>
            <option value="15">Australia</option>
            <option value="16">Austria</option>
            <option value="17">Azerbaijan</option>
            <option value="18">Bahamas</option>
            <option value="19">Bahrain</option>
            <option value="20">Bangladesh</option>
            <option value="21">Barbados</option>
            <option value="22">Belarus</option>
            <option value="23">Belgium</option>
            <option value="24">Belize</option>
            <option value="25">Benin</option>
            <option value="26">Bermuda</option>
            <option value="27">Bhutan</option>
            <option value="28">Bolivia</option>
            <option value="29">Bosnia and Herzegovina</option>
            <option value="30">Botswana</option>
            <option value="31">Bouvet Island</option>
            <option value="32">Brazil</option>
            <option value="34">Brunei Darussalam</option>
            <option value="35">Bulgaria</option>
            <option value="36">Burkina Faso</option>
            <option value="37">Burundi</option>
            <option value="38">Cambodia</option>
            <option value="39">Cameroon</option>
            <option value="40">Cape Verde</option>
            <option value="41">Cayman Islands</option>
            <option value="42">Central African Republic</option>
            <option value="43">Chad</option>
            <option value="44">Chile</option>
            <option value="45">China</option>
            <option value="46">Christmas Island</option>
            <option value="47">Cocos (Keeling) Islands</option>
            <option value="48">Colombia</option>
            <option value="49">Comoros</option>
            <option value="50">Congo</option>
            <option value="51">Cook Islands</option>
            <option value="52">Costa Rica</option>
            <option value="53">Croatia (Hrvatska)</option>
            <option value="54">Cuba</option>
            <option value="55">Cyprus</option>
            <option value="56">Czech Republic</option>
            <option value="57">Denmark</option>
            <option value="58">Djibouti</option>
            <option value="59">Dominica</option>
            <option value="60">Dominican Republic</option>
            <option value="61">East Timor</option>
            <option value="62">Ecuador</option>
            <option value="63">Egypt</option>
            <option value="64">El Salvador</option>
            <option value="65">Equatorial Guinea</option>
            <option value="66">Eritrea</option>
            <option value="67">Estonia</option>
            <option value="68">Ethiopia</option>
            <option value="69">Falkland Islands (Malvinas)</option>
            <option value="70">Faroe Islands</option>
            <option value="71">Fiji</option>
            <option value="72">Finland</option>
            <option value="73">France</option>
            <option value="74">France, Metropolitan</option>
            <option value="75">French Guiana</option>
            <option value="76">French Polynesia</option>
            <option value="77">French Southern Territories</option>
            <option value="78">Gabon</option>
            <option value="79">Gambia</option>
            <option value="80">Georgia</option>
            <option value="81">Germany</option>
            <option value="82">Ghana</option>
            <option value="83">Gibraltar</option>
            <option value="84">Greece</option>
            <option value="85">Greenland</option>
            <option value="86">Grenada</option>
            <option value="87">Guadeloupe</option>
            <option value="88">Guam</option>
            <option value="89">Guatemala</option>
            <option value="90">Guinea</option>
            <option value="91">Guinea-Bissau</option>
            <option value="92">Guyana</option>
            <option value="93">Haiti</option>
            <option value="94">Heard and Mc Donald Islands</option>
            <option value="95">Honduras</option>
            <option value="96">Hong Kong</option>
            <option value="97">Hungary</option>
            <option value="98">Iceland</option>
            <option value="99">India</option>
            <option value="100">Indonesia</option>
            <option value="101">Iran (Islamic Republic of)</option>
            <option value="102">Iraq</option>
            <option value="103">Ireland</option>
            <option value="104">Israel</option>
            <option value="105">Italy</option>
            <option value="106">Ivory Coast</option>
            <option value="107">Jamaica</option>
            <option value="108">Japan</option>
            <option value="109">Jordan</option>
            <option value="110">Kazakhstan</option>
            <option value="111">Kenya</option>
            <option value="112">Kiribati</option>
            <option value="113">
              Korea, Democratic People&apos;s Republic of
            </option>
            <option value="114">Korea, Republic of</option>
            <option value="115">Kosovo</option>
            <option value="116">Kuwait</option>
            <option value="117">Kyrgyzstan</option>
            <option value="118">Lao People&apos;s Democratic Republic</option>
            <option value="119">Latvia</option>
            <option value="120">Lebanon</option>
            <option value="121">Lesotho</option>
            <option value="122">Liberia</option>
            <option value="123">Libyan Arab Jamahiriya</option>
            <option value="124">Liechtenstein</option>
            <option value="125">Lithuania</option>
            <option value="126">Luxembourg</option>
            <option value="127">Macau</option>
            <option value="128">Macedonia</option>
            <option value="129">Madagascar</option>
            <option value="130">Malawi</option>
            <option value="131">Malaysia</option>
            <option value="132">Maldives</option>
            <option value="133">Mali</option>
            <option value="134">Malta</option>
            <option value="135">Marshall Islands</option>
            <option value="136">Martinique</option>
            <option value="137">Mauritania</option>
            <option value="138">Mauritius</option>
            <option value="139">Mayotte</option>
            <option value="140">Mexico</option>
            <option value="141">Micronesia, Federated States of</option>
            <option value="142">Moldova, Republic of</option>
            <option value="143">Monaco</option>
            <option value="144">Mongolia</option>
            <option value="145">Montenegro</option>
            <option value="146">Montserrat</option>
            <option value="147">Morocco</option>
            <option value="148">Mozambique</option>
            <option value="149">Myanmar</option>
            <option value="150">Namibia</option>
            <option value="151">Nauru</option>
            <option value="152">Nepal</option>
            <option value="153">Netherlands</option>
            <option value="154">Netherlands Antilles</option>
            <option value="155">New Caledonia</option>
            <option value="156">New Zealand</option>
            <option value="157">Nicaragua</option>
            <option value="158">Niger</option>
            <option value="159">Nigeria</option>
            <option value="160">Niue</option>
            <option value="161">Norfork Island</option>
            <option value="162">Northern Mariana Islands</option>
            <option value="163">Norway</option>
            <option value="164">Oman</option>
            <option value="165">Pakistan</option>
            <option value="166">Palau</option>
            <option value="167">Panama</option>
            <option value="168">Papua New Guinea</option>
            <option value="169">Paraguay</option>
            <option value="170">Peru</option>
            <option value="171">Philippines</option>
            <option value="172">Pitcairn</option>
            <option value="173">Poland</option>
            <option value="174">Portugal</option>
            <option value="175">Puerto Rico</option>
            <option value="176">Qatar</option>
            <option value="177">Reunion</option>
            <option value="178">Romania</option>
            <option value="179">Russian Federation</option>
            <option value="180">Rwanda</option>
            <option value="181">Saint Kitts and Nevis</option>
            <option value="182">Saint Lucia</option>
            <option value="183">Saint Vincent and the Grenadines</option>
            <option value="184">Samoa</option>
            <option value="185">San Marino</option>
            <option value="186">Sao Tome and Principe</option>
            <option value="187">Saudi Arabia</option>
            <option value="188">Senegal</option>
            <option value="189">Serbia</option>
            <option value="190">Seychelles</option>
            <option value="191">Sierra Leone</option>
            <option value="192">Singapore</option>
            <option value="193">Slovakia</option>
            <option value="194">Slovenia</option>
            <option value="195">Solomon Islands</option>
            <option value="196">Somalia</option>
            <option value="197">South Africa</option>
            <option value="198">South Georgia South Sandwich Islands</option>
            <option value="199">Spain</option>
            <option value="200">Sri Lanka</option>
            <option value="201">St. Helena</option>
            <option value="202">St. Pierre and Miquelon</option>
            <option value="203">Sudan</option>
            <option value="204">Suriname</option>
            <option value="205">Svalbarn and Jan Mayen Islands</option>
            <option value="206">Swaziland</option>
            <option value="207">Sweden</option>
            <option value="208">Switzerland</option>
            <option value="209">Syrian Arab Republic</option>
            <option value="210">Taiwan</option>
            <option value="211">Tajikistan</option>
            <option value="212">Tanzania, United Republic of</option>
            <option value="213">Thailand</option>
            <option value="214">Togo</option>
            <option value="215">Tokelau</option>
            <option value="216">Tonga</option>
            <option value="217">Trinidad and Tobago</option>
            <option value="218">Tunisia</option>
            <option value="219">Turkey</option>
            <option value="220">Turkmenistan</option>
            <option value="221">Turks and Caicos Islands</option>
            <option value="222">Tuvalu</option>
            <option value="223">Uganda</option>
            <option value="224">Ukraine</option>
            <option value="225">United Arab Emirates</option>
            <option value="226">United Kingdom</option>
            <option value="227">United States minor outlying islands</option>
            <option value="228">Uruguay</option>
            <option value="229">Uzbekistan</option>
            <option value="230">Vanuatu</option>
            <option value="231">Vatican City State</option>
            <option value="232">Venezuela</option>
            <option value="233">Vietnam</option>
            <option value="238">Yemen</option>
            <option value="239">Yugoslavia</option>
            <option value="240">Zaire</option>
            <option value="241">Zambia</option>
            <option value="242">Zimbabwe</option>
            <option value="243">Palestine</option>
          </select>
        </div>

        <div className="filter-dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="dropdown-icon"
          >
            <path
              fill="currentColor"
              d="M7.5,2A2,2 0 0,1 9.5,4A2,2 0 0,1 7.5,6A2,2 0 0,1 5.5,4A2,2 0 0,1 7.5,2M6,7H9A2,2 0 0,1 11,9V14.5H9.5V22H5.5V14.5H4V9A2,2 0 0,1 6,7M14.5,12A2,2 0 0,1 16.5,10A2,2 0 0,1 18.5,12A2,2 0 0,1 16.5,14A2,2 0 0,1 14.5,12M13.5,15H19.5V19H18V22H15V19H13.5V15Z"
            ></path>
          </svg>
          <Dropdown name={"Age"}>
            {allAgeVals.map((val, index) => (
              <div key={val.id}>
                <label className="inline-flex items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 ring-0 text-lightPlayRed focus:ring-0 focus:outline-0 outline-none"
                    checked={index === selectedAge}
                    onChange={() => setSelectedAge(val.id)}
                  />
                  <span className="ml-2 text-sm">{val.value}</span>
                </label>
                <div className={index === 1 ? "hidden" : ""}>
                  {selectedAge === 0 && (
                    <RangeSlider
                      key={index}
                      initialMin={1800}
                      initialMax={5000}
                      min={1000}
                      max={7000}
                      step={100}
                      priceCap={500}
                    />
                  )}
                </div>
              </div>
            ))}
          </Dropdown>
        </div>
        <div className="filter-dropdown">
          <FaCheckCircle className="dropdown-icon" />
          <Dropdown name={"Verified"}>
            {allVerifiedVals.map((val, index) => (
              <label className="inline-flex items-center " key={index}>
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 ring-0 text-lightPlayRed focus:ring-0 focus:outline-0 outline-none"
                  checked={index === selectedVerified}
                  onChange={() => {
                    setSelectedVerified(val.id);
                  }}
                />
                <span className="ml-2 text-sm">{val.value}</span>
              </label>
            ))}
          </Dropdown>
        </div>
        <div className="filter-dropdown">
          <BsFillEyeFill className="dropdown-icon" />
          <Dropdown name={"Status"}>
            {allStatusVals.map((val, index) => (
              <label className="inline-flex items-center " key={index}>
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 ring-0 text-lightPlayRed focus:ring-0 focus:outline-0 outline-none"
                  checked={index === selectedStatus}
                  onChange={() => {
                    setSelectedStatus(val.id);
                  }}
                />
                <span className="ml-2 text-sm">{val.value}</span>
              </label>
            ))}
          </Dropdown>
        </div>
        <div className="filter-dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="dropdown-icon"
          >
            <path
              fill="currentColor"
              d="M9,11.75A1.25,1.25 0 0,0 7.75,13A1.25,1.25 0 0,0 9,14.25A1.25,1.25 0 0,0 10.25,13A1.25,1.25 0 0,0 9,11.75M15,11.75A1.25,1.25 0 0,0 13.75,13A1.25,1.25 0 0,0 15,14.25A1.25,1.25 0 0,0 16.25,13A1.25,1.25 0 0,0 15,11.75M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,11.71 4,11.42 4.05,11.14C6.41,10.09 8.28,8.16 9.26,5.77C11.07,8.33 14.05,10 17.42,10C18.2,10 18.95,9.91 19.67,9.74C19.88,10.45 20,11.21 20,12C20,16.41 16.41,20 12,20Z"
            ></path>
          </svg>
          <Dropdown name={"Gender"}>
            {allGenderVals.map((val, index) => (
              <label className="inline-flex items-center " key={index}>
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 ring-0 text-lightPlayRed focus:ring-0 focus:outline-0 outline-none"
                  checked={index === selectedGender}
                  onChange={() => {
                    setSelectedGender(val.id);
                  }}
                />
                <span className="ml-2 text-sm">{val.value}</span>
              </label>
            ))}
          </Dropdown>
        </div>
        <div className="filter-dropdown">
          <MdImage className="dropdown-icon" />
          <Dropdown name={"Avatar"}>
            {allAvatarVals.map((val, index) => (
              <label className="inline-flex items-center " key={index}>
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 ring-0 text-lightPlayRed focus:ring-0 focus:outline-0 outline-none"
                  checked={index === selectedAvatar}
                  onChange={() => {
                    setSelectedAvatar(val.id);
                  }}
                />
                <span className="ml-2 text-sm">{val.value}</span>
              </label>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
