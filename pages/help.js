/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import ProfileNavBar from "../components/ProfileNavBar";

function Help() {
  const inputData = [
    {
      id: "Firstname",
      name: "First name",
      type: "text",
    },
    {
      id: "Lasttname",
      name: "Last name",
      type: "text",
    },
    {
      id: "Email",
      name: "E-mail",
      type: "text",
    },
  ];
  return (
    <div className="flex p-2 rounded shadow">
      <ProfileNavBar className="w-24 mb-8" />
      <div className=" w-full px-1 mx-auto pt-3 mr-24  mt-12 bg-white rounded grid grid-cols-2 grid-5">
        <div>
          <p className="font-semibold mt1.5 mb-3.5 pl-2 text-lightPlayRed text-[10px]">
            CONTACT US
          </p>
          <p className="font-semibold mt1.5 mb-3.5 pl-2 text-[42px]">
            Let us help you solve your issues.
          </p>

          <Image
            src="/images/Illustration/help.jpg"
            alt="Picture of the author"
            width={300}
            height={300}
          />
        </div>

        <div>
          <form action="" className=" space-y-7 outline-0">
            {inputData.map((input) => (
              <div className="flex flex-col space-y-3 " key={input}>
                <input
                  className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100 "
                  type={input.type}
                  id={input.id}
                  name={input.name}
                  placeholder={input.name}
                  required
                  minLength="6"
                  maxLength="10" 
                  size="12"
                />
              </div>
            ))}
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows="6"
              cols="50"
              className="flex flex-row space-y-2 w-full rounded border-b-2 border-0 bg-gray-100"
            />
            <div className="flex mt-7 space-x-2 p-3 bg-gray-100 border border-gray-300">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                className="mt-1"
              />
              <label>
                Agree with privacy publicly to receive communications.
              </label>
            </div>
            <div className="flex justify-center items-center">
              <button className="text-white bg-lightPlayRed py-1.5 px-10 rounded-md text-[15px]">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Help;
