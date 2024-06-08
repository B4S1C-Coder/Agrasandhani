import React from 'react'
// import 
// { BsFillArchiveFill, BsFillBellFill}
//  from 'react-icons/bs'
 import 
 { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Home() {

    const data = [
        {
          name: 'Quiz 1',
          marks: 40,
        },
        {
          name: 'Quiz 2',
          marks: 30,
        },
        {
          name: 'Quiz 3',
          marks: 20,
        },
        {
          name: 'Quiz 4',
          marks: 28,
        },
        {
          name: 'Quiz 5',
          marks: 89,
        },
        {
          name: 'Quiz 6',
          marks: 90,
        },
        {
          name: 'Quiz 7',
          marks: 90,
        },
        {
          name: 'Quiz 8',
          marks: 49,
        },
        {
          name: 'Quiz 9',
          marks: 90,
        },
        {
          name: 'Quiz 10',
          marks: 90,
        },
        {
          name: 'Quiz 11',
          marks: 0,
        },
        {
          name: 'Quiz 12',
          marks: 0,
        },
        {
          name: 'Quiz 13',
          marks: 0,
        },
        {
          name: 'Quiz 14',
          marks: 0,
        },
        {
          name: 'Quiz 15',
          marks: 0,
        }
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h1>Quiz Status:</h1>
                    {/* <BsFillArchiveFill className='card_icon'/> */}
                </div>
                <h3>Attempted - 10/15</h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h1>Notifications:</h1>
                    {/* <BsFillBellFill className='card_icon'/> */}
                </div>
                <h3>5</h3>
            </div>
        </div>

        <div className='charts'>
            <div style={{ width: '200%', height: 400, marginTop: 0 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="marks" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </main>
  )
}

export default Home
