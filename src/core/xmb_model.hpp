#pragma once
#include <cstddef>
#include <string>
#include <vector>

namespace ps3x360 {
struct MenuItem { std::string id; std::string label; };
struct Category { std::string id; std::string label; std::vector<MenuItem> items; };

class XmbModel {
public:
  explicit XmbModel(std::vector<Category> categories);
  const std::vector<Category>& categories() const noexcept;
  std::size_t selected_category() const noexcept;
  std::size_t selected_item() const noexcept;
  const Category& current_category() const;
  const MenuItem& current_item() const;
  bool move_category(int delta) noexcept;
  bool move_item(int delta) noexcept;
  bool select_category(std::size_t index) noexcept;
  bool select_item(std::size_t index) noexcept;
private:
  std::vector<Category> categories_;
  std::size_t selected_category_{0};
  std::size_t selected_item_{0};
  static std::size_t wrap_index(std::size_t current, int delta, std::size_t count) noexcept;
};
std::vector<Category> make_default_categories();
} // namespace ps3x360
