#include "xmb_model.hpp"
#include <cstdlib>
#include <iostream>
#include <stdexcept>
#include <string>

namespace {
int failures = 0;
void check(bool condition, const std::string& description) {
  if (condition) std::cout << "[PASS] " << description << '\n';
  else { std::cerr << "[FAIL] " << description << '\n'; ++failures; }
}
template<class F> void check_throws(F&& action, const std::string& description) {
  try { action(); check(false, description); }
  catch (const std::invalid_argument&) { check(true, description); }
}
}
int main() {
  using namespace ps3x360;
  XmbModel model(make_default_categories());
  check(model.categories().size() == 7, "default XMB has seven categories");
  check(model.current_category().id == "users", "initial category is users");
  check(model.current_item().id == "profile", "initial item is profile");
  check(model.move_category(1), "move right changes category");
  check(model.current_category().id == "settings", "right selects settings");
  check(model.selected_item() == 0, "category change resets vertical selection");
  check(model.move_item(1), "move down changes item");
  check(model.current_item().id == "display", "down selects display setting");
  check(model.move_item(-1), "move up changes item");
  check(model.current_item().id == "system", "up returns to system setting");
  check(model.select_category(5), "direct category selection succeeds");
  check(model.current_category().id == "games", "games category selected");
  check(model.select_item(2), "direct item selection succeeds");
  check(model.current_item().id == "refresh", "refresh item selected");
  check(!model.select_category(999), "invalid category index rejected");
  check(!model.select_item(999), "invalid item index rejected");
  check(!model.move_category(0), "zero horizontal movement is a no-op");
  check(!model.move_item(0), "zero vertical movement is a no-op");
  check(model.move_category(1), "category advances");
  check(model.current_category().id == "network", "network follows games");
  check(model.move_category(1), "category navigation wraps");
  check(model.current_category().id == "users", "right wraps to first category");
  check(model.move_category(-1), "left navigation wraps");
  check(model.current_category().id == "network", "left wraps to last category");
  check_throws([] { XmbModel invalid({}); }, "empty category list rejected");
  check_throws([] { XmbModel invalid({Category{"empty","Empty",{}}}); }, "category without items rejected");
  if (failures) { std::cerr << failures << " test(s) failed.\n"; return EXIT_FAILURE; }
  std::cout << "All PS3X360 core tests passed.\n"; return EXIT_SUCCESS;
}
