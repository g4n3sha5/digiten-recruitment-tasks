'use client';

import { TaskContainer } from '@/components/ui/TaskContainer';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { GraphDownArrow, GraphUpArrow } from 'react-bootstrap-icons';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

interface SolarSystemObject {
  id: SolarSystemObjectType;
  knownCount: number;
  rel: string;
  updateDate: string;
}

type SolarSystemObjectType =
  | 'planet'
  | 'dwarfPlanet'
  | 'asteroid'
  | 'comet'
  | 'moonsPlanet'
  | 'moonsDwarfPlanet'
  | 'moonsAsteroid';

// type ChartData = { labels: string[]; values: number[] };
type ChartData = { label: string; value: number };

export default function SpaceData() {
  const [error, setError] = useState('');
  const apiUrl = 'https://api.le-systeme-solaire.net/rest/knowncount/';
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [sorting, setSorting] = useState<'desc' | 'asc'>('desc');

  // Adopting data from API to Chart.js format; making the label human readable for the chart
  const processChartData = (data: SolarSystemObject[]) => {
    const humanReadableLabelDict: { [key in SolarSystemObjectType]: string } = {
      planet: 'Planet',
      dwarfPlanet: 'Dwarf Planet',
      asteroid: 'Asteroid',
      comet: 'Comet',
      moonsPlanet: 'Moons of Planet',
      moonsDwarfPlanet: 'Moons of Dwarf Planet',
      moonsAsteroid: 'Moons of Asteroid',
    };

    const mappedData = data.map((obj) => {
      return {
        label: humanReadableLabelDict[obj.id],
        value: obj.knownCount,
      };
    });
    setChartData(sortChartData(mappedData));
  };

  // Sorting is handled by state to allow changing the color of icons to make the UX better.
  // Define function to call for sorting when state changes
  const sortChartData = (data: ChartData[]) => {
    return [...data].sort((a, b) => {
      if (sorting === 'desc') {
        return b.value - a.value;
      }
      return a.value - b.value;
    });
  };

  useEffect(() => {
    setChartData(sortChartData(chartData));
  }, [sorting]);

  // Fetch data  with useEffect and assign it to solarSystemData, set a human readable error in case any error is encountered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        processChartData(json.knowncount);
      } catch (error) {
        setError('Error connecting to api, please contact our specialists');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TaskContainer
      id="spaceData"
      taskNumber={1}
      className="relative min-h-screen pb-24 xpt-2"
      taskDescription="Your company is developing a dashboard to display real-time data from various sources. You are tasked with creating a data visualisation component that displays live data using React.js and integrates it with HTML
    and CSS for a seamless user interface"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-center text-gray-800">
          API URL:&nbsp;
          <a className="text-cyan-600 hover:text-cyan-300" href={apiUrl}>
            {apiUrl}
          </a>
        </div>
      </div>

      <div className="py-4 flex items-center flex-col justify-center px-4 w-full">
        <h1 className="pb-7">
          Humans love numbers. Below you can see the amount of some of the objects we counted in the Solar System using
          logarithmic scale chart.
        </h1>

        {error ? (
          <h1 className="py-5 text-3xl">{error}</h1>
        ) : (
          <div className="mt-10 relative mb-5 w-full">
            <div className="absolute right-0 -top-12 md:-top-6 flex flex-col ">
              <h1 className="">Sort </h1>
              <div className="flex gap-x-2 md:gap-x-3">
                <GraphUpArrow
                  className="h-5 w-5 md:w-7  cursor-pointer"
                  color={sorting === 'asc' ? 'cyan' : 'black'}
                  onClick={() => {
                    setSorting('asc');
                  }}
                />
                <GraphDownArrow
                  className="h-5 w-5 md:w-7  cursor-pointer"
                  color={sorting === 'desc' ? 'cyan' : 'black'}
                  onClick={() => {
                    setSorting('desc');
                  }}
                />
              </div>
            </div>
            <div className=" h-[550px]">
              <Bar
                data={{
                  labels: chartData.map((obj) => obj.label),
                  datasets: [
                    {
                      label: 'Amount of object in Solar System',
                      backgroundColor: ['#4361EE', 'cyan', 'red', 'grey', 'darkGrey', '#3A0CA3'],
                      data: chartData.map((obj) => obj.value),
                      borderWidth: 1,
                    },
                  ],
                }}
                // Options to make the chart repsonsive
                options={{
                  events: ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      type: 'logarithmic', // Use logarithmic scale for the y-axis
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </TaskContainer>
  );
}
