#include <iostream>
#include <string>

using namespace std;

int main()
{
  int a = 1;
  string c = "hello";
  int b[] = {1, 2, 3, 4};
  cout << "b所占用的空间大小==>" << sizeof(b) << endl;
  cout << "b单个元素占得大小==>" << sizeof(b[0]) << endl;
  int bNum = sizeof(b) / sizeof(b[0]);
  cout << "b的个数为：" << bNum << endl;

  for (int i = 0; i < c.size(); i++)
  {
    /* code */
    c[i] = toupper(c[i]);
    cout << "当前的值:" << c << endl;
  }
  int func(int a) {
    return a + 1;
  }
  
}
