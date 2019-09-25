using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyApp
{
    class Program
    {
        static void Curs1(string[] args)
        {
            Console.WriteLine("Hello world!");
            for (int i = 0; i < args.Length; i++)
            {
                Console.WriteLine("Element {0}: {1}", i, args[i]);
            }
            
            // Get an array of the command line arguments
            string[] myArgs = Environment.GetCommandLineArgs();

            // Use the Join function to combine arguments with a comma
            Console.WriteLine(string.Join(", ", myArgs));

            // SayHello();

            // Console.WriteLine(bool.Parse("1")); //nu merge

            // ---------- DATETIME & TIMESPAN ----------
            Console.WriteLine("datetime".ToUpper());
            // Used to define dates
            DateTime awesomeDate = new DateTime(1974, 12, 21);
            Console.WriteLine("Day of Week : {0}", awesomeDate.DayOfWeek);

            // You can change values
            awesomeDate = awesomeDate.AddDays(4);
            awesomeDate = awesomeDate.AddMonths(1);
            awesomeDate = awesomeDate.AddYears(1);
            Console.WriteLine("New Date : {0}", awesomeDate);
            Console.WriteLine("New Date : {0}", awesomeDate.Date);

            // TimeSpan
            // Used to define a time
            Console.WriteLine("TimeSpan".ToUpper());
            TimeSpan lunchTime = new TimeSpan(12, 30, 0);

            // Change values
            lunchTime = lunchTime.Subtract(new TimeSpan(0, 15, 0));
            Console.WriteLine(lunchTime);
            lunchTime = lunchTime.Add(new TimeSpan(1, 0, 0));
            Console.WriteLine("New Time : {0}", lunchTime.ToString());

            // ---------- FORMATTING OUTPUT ----------

            // Format output for currency
            Console.WriteLine("Formatting".ToUpper());
            Console.WriteLine("Currency : {0:c}", 23.455);

            // Pad with zeroes 
            Console.WriteLine("Pad with 0s : {0:d7}", 23);

            // Define decimals 
            Console.WriteLine("3 Decimals : {0:f2}", 23.4555);

            // Add commas and decimals
            Console.WriteLine("Commas : {0:n12}", 2300);


            // ---------- STRINGS ----------
            Console.WriteLine("STRINGS");
            // Strings store a series of characters
            string randString = "This is a string";

            // Get number of characters in string
            Console.WriteLine("String Length : {0}", randString.Length);

            // Check if string contains other string
            Console.WriteLine("String Contains is : {0}",
                randString.Contains("is"));

            // Index of string match
            Console.WriteLine("Index of is : {0}",
                randString.IndexOf("is"));

            // Remove number of characters starting at an index
            Console.WriteLine("Remove string : {0}",
                randString.Remove(10, 6));

            // Add a string starting at an index
            Console.WriteLine("Insert String : {0}",
                randString.Insert(10, "short "));

            // Replace a string with another
            Console.WriteLine("Replace String : {0}",
                randString.Replace("string", "sentence"));

            // Compare strings and ignore case
            // < 0 : str1 preceeds str2
            // = : Zero
            // > 0 : str2 preceeds str1
            Console.WriteLine("Compare A to B : {0}",
                String.Compare("A", "B", StringComparison.OrdinalIgnoreCase));

            // Check if strings are equal
            Console.WriteLine("A = a : {0}",
                String.Equals("A", "a", StringComparison.OrdinalIgnoreCase));

            // Add padding left
            Console.WriteLine("Pad Left : {0}",
                randString.PadLeft(20, '.'));

            // Add padding right
            Console.WriteLine("Pad Right : {0} Stuff",
                randString.PadRight(20, '.'));

            // Trim whitespace
            Console.WriteLine("Trim : {0}",
                randString.Trim());

            // Make uppercase
            Console.WriteLine("Uppercase : {0}",
                randString.ToUpper());

            // Make lowercase
            Console.WriteLine("Lowercase : {0}",
                randString.ToLower());

            // Use Format to create strings
            string newString = String.Format("{0} saw a {1} {2} in the {3}",
                "Paul", "rabbit", "eating", "field");

            // You can add newlines with \n and join strings with +
            Console.Write(newString + "\n");

            // Other escape characters
            // \' \" \\ \t \a

            // Verbatim strings ignore escape characters
            Console.Write(@"Exactly What I Typed");


            char[] charsToTrim = { '*', ' ', '\'' };
            string banner = "*** Much * Ado About Nothing ***";
            string result = banner.Trim(charsToTrim);
            Console.WriteLine("Trimmmed\n   {0}\nto\n   '{1}'", banner, result);
        }
        [Serializable]
        class MyException : Exception
        {
            public MyException()
            {

            }

            public MyException(string name)
                : base(name)
            {

            }

        }


        public class BaseClass
        {
            public virtual string GetMethodOwnerName()
            {
                return "Base Class";
            }
        }
        public class ChildClass : BaseClass
        {
            public new virtual string GetMethodOwnerName()
            {
                return "ChildClass";
            }
        }
        public class SecondChild : ChildClass
        {
            public override string GetMethodOwnerName()
            {
                return "Second level Child";
            }
        }


        static void Main(string[] args)
        {
            //Curs1(args);
            /*var numbers = new Tuple<int, string>(1, "Teo");
            Console.WriteLine(numbers.Item1);
            var numbers1 = Tuple.Create(2, "Teofana");
            Console.WriteLine(numbers1.Item2);*/

            /*try
            {
                throw new MyException("teof");
            }
            catch(MyException ex)
            {
                Console.WriteLine(ex.Message);
            }*/

            /*ChildClass sc = new ChildClass();
            Console.WriteLine(sc.GetMethodOwnerName());*/

            IList<int> lista = new List<int> { 1, 2, 3, 4, 5 };
            IList<int> fil = lista.Where(x => x > 3).ToList();
            Console.WriteLine(lista.Where(x => x < 3).Sum());
            foreach (int x in fil)
            {
                Console.WriteLine(x);
            }


        }



        private static void SayHello()
        {
            Console.Write("Type your name: ");
            string name = Console.ReadLine();
            Console.WriteLine("Hello, {0}", name);
        }
    }
}
