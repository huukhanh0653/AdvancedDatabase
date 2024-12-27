
import BossLayout from '@/src/admin/layout/BossLayout';
import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/src/admin/pages/Dashboard/components/date-range-picker"
import { Overview } from "@/src/admin/pages/Dashboard/components/overview"
import { RecentSales } from "@/src/admin/pages/Dashboard/components/recent-sales"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownOption } from '@/src/admin/components/dropdown';
import { formattedDate } from "@/lib/utils"

const options = [
    "Cấp công ty", 
    "Miền Nam",
    "Miền Trung",
    "Miền Bắc"
]


export default function DashboardPage() {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [searchDishQuery, setSearchDishQuery] = useState('');
    const [data, setData] = useState([]);
    const [recentSales, setRecentSales] = useState([]);
    const [dailyRevenue, setDailyRevenue] = useState([]);
    const [date, setDate] = useState({
        from: new Date(2023, 0, 20),
        to: new Date(),
    });



    const handleFilter = async () => {
        let region = 'company';
        if(selectedOption === "Miền Nam") {
            region = 'MN';
        }
        else if(selectedOption === "Miền Trung") {
            region = 'MT';
        }
        else if(selectedOption === "Miền Bắc") {
            region = 'MB';
        }
        try {
            const reponse = await fetch(`http://localhost:5000/admin/statistic-company?Region=${region}&FromDate=${formattedDate(date.from)}&ToDate=${formattedDate(date.to)}`).then((response) => response.json());
            console.log(reponse);
            setData(reponse);
            setRecentSales(reponse.recentSales);
            setDailyRevenue(reponse.dailyRevenue);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        handleFilter();
    }, []);

  return (
    <BossLayout>
        <div className="flex items-center justify-between space-y-5">
        <h2 className="text-3xl font-bold tracking-tight">Thống kê</h2>
        <div className="flex items-center space-x-2 justify-between">
            {/* drop down */}
            <DropdownOption id = "option" className="w-full" options={options} value={selectedOption} onValueChange={setSelectedOption}/>
            <CalendarDateRangePicker date={date} onDateChange={setDate} />
            <Button 
                className="bg-blue-500 text-white"
                onClick ={handleFilter}>Xem thống kê</Button>
        </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-5">
            <TabsList>
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng doanh thu
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalRevenue}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Khách hàng thân thiết
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalNewMember}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tổng hóa đơn</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalBills}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Tổng khách hàng
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalCustomer}</div>
                    </CardContent>
                </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2 pt-2">
                            
                            <Overview dailyRevenue={dailyRevenue}/>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <div className = "flex justify-between">
                                <CardTitle>Doanh thu món ăn</CardTitle>
                                <Input
                                    type="search"
                                    placeholder="Tìm kiếm theo tên món ăn..."
                                    className="md:w-[100px] lg:w-[300px]"
                                    value={searchDishQuery}
                                    onChange={(e) => setSearchDishQuery(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <RecentSales data={recentSales} searchQuery={searchDishQuery}/>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    </BossLayout>
    )
}