export async function POST(request: Request) {

    try {
        const data = await request.json();
        console.log("Received Data: ", data);

        const numbers: number[] = [];
        const alphabets: string[] = [];
        let highestLowercase: string | null = null;

        data.data.forEach((item: any) => {
            if (!isNaN(Number(item))) {
                numbers.push(Number(item));
            } else if (/[a-zA-Z]/.test(item)) {
                alphabets.push(item);
                if (/[a-z]/.test(item)) {
                    if (!highestLowercase || item > highestLowercase) {
                        highestLowercase = item;
                    }
                }
            }
        });

        return Response.json({
            is_success: true,
            user_id: "Bharat_Somvanshi_27072003",
            email: "bharat.somvanshi2021@virbhopal.ac.in",
            roll_number: "21BAI10086",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase,
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return Response.json({
            is_success: false,
            mesaage: error.message
        }, { status: 400 });
    }
};

export async function GET(request: Request) {
    return Response.json({
        operation_code: 1,
    }, { status: 200 });
};
