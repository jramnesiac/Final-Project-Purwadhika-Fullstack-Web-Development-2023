import { useState } from "react"

export const ProfileSettingSelectTop = ({ choose, value }) => {
  const [click, setClick] = useState("")
  const fireBaseToken = localStorage.getItem("firebase-token")

  const clickChangeProfile = () => {
    setClick("changeProfile")
    choose("changeProfile")
  }
  const clickChangePassword = () => {
    setClick("changePassword")
    choose("changePassword")
  }
  return (
    <div className="w-full">
      <div className="flex justify-between w-full  bg-bgPrimary h-14">
        <div className={`
          pt-4
          p-2
          text-sm
          ${fireBaseToken ? "hidden" : "block"}
					${click || value === "changePassword" ? "bg-bgPrimaryActive" : "bg-bgPrimary"}
          ${click || value === "changePassword" ? "text-white" : "text-white"}
          cursor-pointer		
					`}
          onClick={clickChangePassword}
        >
          Change password
        </div>

        <div className={
        `my-auto ${fireBaseToken ? "hidden" : "block"}`}
        >
          Profile
        </div>

        <div className={
        "my-auto"}
        >
          Order History
        </div>
        
      </div>
    </div>
  )
}