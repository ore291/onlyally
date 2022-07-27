import React from 'react';



const BalanceCard = ({title , Icon , balance}) => {
  return (
    <div className="flex items-center py-[15px] px-[14px] bg-white rounded-xl shadow-sm">
        <Icon className="w-10 h-10 text-[#E6023D] max-w-[4em]" />
        <div className="pl-1 flex flex-col items-start justify-between ">
            <h5 className="text-[0.9em] font-semibold whitespace-nowrap">{title}</h5>
            <h3 className="text-[#969fb1] font-medium">{balance}</h3>
        </div>
    </div>
  )
}

export default BalanceCard