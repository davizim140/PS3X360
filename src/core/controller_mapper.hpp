#pragma once

namespace ps3x360 {

// Logical actions are deliberately independent of any controller API.
// A future Xbox 360 backend must translate physical button states to these values.
enum class InputAction {
  None,
  Left,
  Right,
  Up,
  Down,
  Confirm,
  Back
};

enum class PhysicalButton {
  DpadLeft,
  DpadRight,
  DpadUp,
  DpadDown,
  A,
  B,
  Other
};

constexpr InputAction map_button(PhysicalButton button) noexcept {
  switch (button) {
    case PhysicalButton::DpadLeft: return InputAction::Left;
    case PhysicalButton::DpadRight: return InputAction::Right;
    case PhysicalButton::DpadUp: return InputAction::Up;
    case PhysicalButton::DpadDown: return InputAction::Down;
    case PhysicalButton::A: return InputAction::Confirm;
    case PhysicalButton::B: return InputAction::Back;
    case PhysicalButton::Other: return InputAction::None;
  }
  return InputAction::None;
}

} // namespace ps3x360
