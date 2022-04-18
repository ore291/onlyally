import React from 'react'

function AudioCallBody() {
  const historyDetails = [
    {
      sno: 1,
      modle: "Test Demo",
      user: 'Bella',
      amount: '$0.00',
      date: '12 May 2022',
      time: '04: 17 PM',
      endTime: '-',
      status: 'Request Sent',
      action: "Accept"
    },
    {
      sno: 2,
      modle: "Test Demo",
      user: 'Bella',
      amount: '$0.00',
      date: '12 May 2022',
      time: '04: 17 PM',
      endTime: '-',
      status: 'Request Sent',
      action: "Start Call"
    },
    {
      sno: 3,
      modle: "Test Demo",
      user: 'Bella',
      amount: '$0.00',
      date: '12 May 2022',
      time: '04: 17 PM',
      endTime: '-',
      status: 'Request Sent',
      action: "Start Call"
    },
    {
      sno: 4,
      modle: "Test Demo",
      user: 'Bella',
      amount: '$0.00',
      date: '12 May 2022',
      time: '04: 17 PM',
      endTime: '-',
      status: 'Request Sent',
      action: "Accept"
    },
    {
      sno: 5,
      modle: "Test Demo",
      user: 'Bella',
      amount: '$0.00',
      date: '12 May 2022',
      time: '04: 17 PM',
      endTime: '-',
      status: 'Request Sent',
      // action: ""
    },
    {
      sno: 6,
      modle: "Test Demo",
      user: 'Bella',
      amount: '$0.00',
      date: '12 May 2022',
      time: '04: 17 PM',
      endTime: '-',
      status: 'Request Sent',
      // action: ""
    },
    {
      sno: 7,
      modle: "Test Demo",
      user: 'Bella',
      amount: '$0.00',
      date: '12 May 2022',
      time: '04: 17 PM',
      endTime: '-',
      status: 'Request Sent',
      action: "Accept"
    }

  ]

  return (
    <div>
      <div className="h-full bg-white w-full rounded-lg space-y-3 mt-4">
        <div className='grid grid-cols-8 justify-items-center text-[14px] font-bold'>
          <p>S.NO</p>
          <p>MODLES</p>
          <p>USER</p>
          <p>AMOUNT</p>
          <p>SCHEDULED AT</p>
          <p>END TIME</p>
          <p>STATUS</p>
          <p>ACTION</p>
        </div>
        <hr />
        <div>
          {historyDetails.map((data, index) => (
            <div key={index}
              className="h-full space-y-3 mt-4">
              <div className='grid grid-cols-8 justify-items-center text-[14px]'>
                <p>{data.sno}</p>
                <p>{data.modle}</p>
                <p>{data.user}</p>
                <p>{data.amount}</p>
                <div>
                  <p>{data.date}</p>
                  <p>{data.data}</p>
                </div>
                <p>{data.endTime}</p>
                <p>{data.status}</p>
                <p className="bg-green-600 w-[60%] py-1 text-center text-white text-[12px] font-semibold">{data.action}</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AudioCallBody;