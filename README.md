## Báo cáo hoàn thành bài tập

Dưới đây là báo cáo về việc hoàn thành bài tập được giao:

### 1. Tìm kiếm item trong array

#### a. Khởi tạo mảng

- Đã khởi tạo mảng có 2000 phần tử với các key là `(id, name, address, gender, phoneNumber, description, source)`, đảm bảo name & source không trùng nhau.

#### b. Viết hàm tìm kiếm (searchItemBynameOrSource)

- Đã viết hàm `searchItemBynameOrSource` để tìm kiếm một item dựa trên source hoặc name trong mảng đã khởi tạo. Hàm này hoạt động đúng như mong đợi.

#### c. Tối ưu hiệu suất

- Để tối ưu hiệu suất cho việc sử dụng hàm `searchItemBynameOrSource`, đã viết lại hàm mới có tên là `improveSearchItemBynameOrSource`. Hàm này đã được cải thiện hiệu suất, giúp tìm kiếm nhanh hơn, đặc biệt khi người dùng sử dụng nhiều lần hoặc cùng một lúc.
- Ngoài ra còn áp dụng thêm phương pháp `Throttling` để giới hạn tần suất gọi một hàm trong một khoảng thời gian nhất định.

### 2. Tìm ngày trong tuần

#### a. Tạo form input

- Đã tạo form `input` để nhập số ngày đi làm tiếp theo.

#### b. Viết hàm trả về thứ của ngày

- Đã viết hàm để trả về thứ của ngày dựa trên số ngày nhập vào.

### 3. Tính toán số lớn

#### a. Viết hàm tính toán

- Đã viết hàm tính toán số lớn bằng JavaScript, hỗ trợ các phép tính `(+, -, \*, /)`.
- Có một vấn đề khi thực hiện phép tính `/` là số nhỏ chia số lớn vẫn chưa được

#### b. Tạo form UI

- Đã tạo form UI đơn giản để hiển thị kết quả tính toán số lớn.
