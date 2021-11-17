import React from 'react';
import { LangContext } from '../../context';
import { Lang } from '../../lang';
import { Line } from 'react-chartjs-2';

export const DashboardRapport = (props) => {
    const { lang } = React.useContext(LangContext);

    const [options, setOptions] = React.useState({});
    const [data, setData] = React.useState({ labels: [], datasets: [] });
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
        if (window.innerWidth >= 1200) {
            setWidth(200);
        } else {
            setWidth(500);
        }
        setOptions({
            responsive: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            beginAtZero: true,
                            maxTicksLimit: 100,
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 50,
                        },
                    },
                ],
            },
        });
        getLine();
    }, []);

    function getLine() {
        setData({
            labels: [
                '01/21',
                '02/21',
                '03/21',
                '04/21',
                '05/21',
                '06/21',
                '07/21',
                '08/21',
                '09/21',
                '10/21',
                '11/21',
                '12/21',
            ],
            datasets: [
                {
                    label: Lang.movement[lang],
                    data: [50, 25, 34, 40, 12, 94, 94, 100, 40, 150, 90, 87, 90],
                    backgroundColor: ['rgba(134, 85, 251, 0.25)', 'rgba(134, 85, 251, 0.15)'],
                    pointBackgroundColor: 'rgb(134, 85, 251)',
                    borderWidth: 2,
                    borderColor: 'rgb(134, 85, 251)',
                },
            ],
        });
    }

    return (
        <>
            <div className="d-flex content-between items-center p-10">
                <div className="text-default-dark t-20">{Lang.mvt_rapport[lang]}</div>
                <button className="btn icon-btn contained-white m-0">
                    <i className="fi fi-rr-menu-dots"></i>
                </button>
            </div>
            <div className="bon-type_container">
                <Line data={data} options={options} height={150} width={width} />
            </div>
        </>
    );
};
