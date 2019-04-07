require 'test_helper'

class FlavorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flavor = flavors(:one)
  end

  test "should get index" do
    get flavors_url, as: :json
    assert_response :success
  end

  test "should create flavor" do
    assert_difference('Flavor.count') do
      post flavors_url, params: { flavor: { name: @flavor.name } }, as: :json
    end

    assert_response 201
  end

  test "should show flavor" do
    get flavor_url(@flavor), as: :json
    assert_response :success
  end

  test "should update flavor" do
    patch flavor_url(@flavor), params: { flavor: { name: @flavor.name } }, as: :json
    assert_response 200
  end

  test "should destroy flavor" do
    assert_difference('Flavor.count', -1) do
      delete flavor_url(@flavor), as: :json
    end

    assert_response 204
  end
end
