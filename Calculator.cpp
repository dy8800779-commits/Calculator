#include <bits/stdc++.h>
using namespace std;
    class Calculator {
private:
    string name;
public:
    Calculator(string userName) {
        name = userName;
        cout << "Welcome, " << name << "!"<<endl;
    }
void airthmatic(){
    double result;
    cin>>result;
     char op;
    while(true){
        cin>>op;
        if(op=='='){
            break;
        }
        if(op=='s'){
            if(result<0){
                cout<<"Invalid Squareroot ! ";
                return;
            }
            result=sqrt(result);
            continue;
        }
        if (op == '!') {
            if (result < 0) {
                cout << "Invalid factorial"<<endl;
                return;
            }
            double fact = 1;
            for (int i = 1; i <= result; i++) {
                fact *= i;
            }
            result = fact;
            continue;
        }
        double num;
        cin>>num;
    switch(op){
        case '+':
        result=result+num;
        break;
        case '-':
        result=result-num;
        break;
        case '*':
        result=result*num;
        break;
        case '/':
        if(num!=0){
        result=result/num;
        }
        else{
            cout<<"Invalid";
        };
        break;
        case '%':
    if (num == 0 || result != floor(result) || num != floor(num)) {
        cout << "Error: Modulus requires non-zero integers!\n";
        return;
    }
     result = (long long)result % (long long)num;
    break;
        case '^':
        result = pow(result, num);
            break;
        default:
        cout<<"Invalid";
                return;
             }
}
cout<<"result = "<<result;
}
void trigonometry() {
    int choice;
    double angle;

    cout << endl<<"Trigonometry"<<endl;
    cout << "1. sin"<<endl;
    cout << "2. cos"<<endl;
    cout << "3. tan"<<endl;
    cout << "Enter choice: ";
    cin >> choice;

    cout << "Enter angle in degrees: ";
    cin >> angle;

    double radian = angle * M_PI/ 180.0;
    switch (choice) {
        case 1:
            cout << "sin(" << angle << ") = "
                 << sin(radian) << endl;
            break;

        case 2:
            cout << "cos(" << angle << ") = "
                 << cos(radian) << endl;
            break;

        case 3:
            if (fmod(angle - 90.0, 180.0) == 0.0) {
                cout << "tan is undefined at this angle\n";
            } else {
                cout << "tan(" << angle << ") = "
                     << tan(radian) << endl;
            }
            break;
        default:
            cout << "Invalid choice"<<endl;
    }
}
void scientificFunctions() {
    int choice;
    double num;

    cout << endl<<"--- Scientific Functions ---"<<endl;
    cout << "1. Square Root (sqrt)"<<endl;
    cout << "2. Log Base 10 (log)"<<endl;
    cout << "3. Natural Log (ln)"<<endl;
    cout << "4. Factorial (!)"<<endl;
    cout << "5. Power (x^y)"<<endl;
    cout << "Enter choice: ";
    cin >> choice;

    cout << "Enter number: ";
    cin >> num;

    switch (choice) {
        case 1:
            if (num < 0)
                cout << "Invalid: negative square root\n";
            else
                cout << "sqrt = " << sqrt(num) << endl;
            break;

        case 2:
            if (num <= 0)
                cout << "Invalid: log requires a positive number"<<endl;
            else
                cout << "log = " << log10(num) << endl;
            break;

        case 3:
            if (num <= 0)
                cout << "Invalid: ln requires a positive number"<<endl;
            else
                cout << "ln = " << log(num) << endl;
            break;

        case 4: {
            if (num < 0 || num != floor(num) || num > 170) {
                cout << "Enter an integer from 0 to 170"<<endl;
                break;
            }

            double fact = 1;
            for (int i = 1; i <= num; i++) {
                fact *= i;
            }

            cout << "Factorial = " << fact << endl;
            break;
        }

        case 5: {
            double power;
            cout << "Enter exponent: ";
            cin >> power;
            cout << "Result = " << pow(num, power) << endl;
            break;
        }

        default:
            cout << "Invalid choice"<<endl;
    }
}


void unitConverter() {
    int choice;
    double value;

    cout << endl<< "--- Unit Converter ---"<<endl;
    cout << "1. Kilometer to Meter"<<endl;
    cout << "2. Meter to Kilometer"<<endl;
    cout << "3. Kilogram to Gram"<<endl;
    cout << "4. Gram to Kilogram"<<endl;
    cout << "5. Celsius to Fahrenheit"<<endl;
    cout << "6. Fahrenheit to Celsius"<<endl;
    cout << "7. Km/h to m/s"<<endl;
    cout << "8. m/s to Km/h"<<endl;
    cout << "Enter choice: ";
    cin >> choice;

    cout << "Enter value: ";
    cin >> value;

    switch (choice) {
        case 1:
            cout << "Result = " << value * 1000 << " m"<<endl;
            break;

        case 2:
            cout << "Result = " << value / 1000 << " km"<<endl;
            break;

        case 3:
            cout << "Result = " << value * 1000 << " g"<<endl;
            break;

        case 4:
            cout << "Result = " << value / 1000 << " kg"<<endl;
            break;

        case 5:
            cout << "Result = " << (value * 9.0 / 5.0) + 32
                 << " F"<<endl;
            break;

        case 6:
            cout << "Result = " << (value - 32) * 5.0 / 9.0
                 << " C"<<endl;
            break;

        case 7:
            cout << "Result = " << value / 3.6 << " m/s"<<endl;
            break;

        case 8:
            cout << "Result = " << value * 3.6 << " km/h"<<endl;
            break;

        default:
            cout << "Invalid choice"<<endl;
    }
}
};
int main() {
    Calculator s("Dipesh Yadav");
    int choice;


    do {
        cout << endl<<"===== Dipesh Scientific Calculator ====="<<endl;
        cout << "1. Arithmetic Calculator"<<endl;
        cout << "2. Trigonometry Calculator"<<endl;
        cout << "3. Scientific Functions"<<endl;
        cout << "4. Unit Converter"<<endl;
        cout << "5. Exit"<<endl;
        cout << "Enter choice: ";

        cin >> choice;

        switch (choice) {
            case 1:
                cout << "Enter question (end with =):"<<endl;
                s.airthmatic();
                break;

            case 2:
                s.trigonometry();
                break;

            case 3:
                s.scientificFunctions();
                break;

            case 4:
                s.unitConverter();
                break;

            case 5:
                cout << "Thank you for using Dipesh Calculator!"<<endl;
                break;

            default:
                cout << "Invalid choice! Try again."<<endl;
        }

    } while (choice != 5);

    return 0;
}