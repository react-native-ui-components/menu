package com.reactnativeuicomponents.menu;

import android.view.ViewGroup;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.ArrayList;
import java.util.Map;

import javax.annotation.Nullable;

public class MenuManager extends ViewGroupManager<MenuView> {

    public static final String REACT_CLASS = "ContextMenu";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
	@NonNull
    public MenuView createViewInstance(ThemedReactContext context) {
        MenuView reactViewGroup = new MenuView(context);
        return reactViewGroup;
    }

    @ReactProp(name = "title")
    public void setTitle(MenuView view, @Nullable String title) {
        // TODO: Maybe support this? IDK if its necessary though
    }

    @ReactProp(name = "actions")
    public void setActions(MenuView view, @Nullable ReadableArray actions) {
        view.setActions(actions);
    }

    @ReactProp(name = "dropdownMenuMode")
    public void setDropdownMenuMode(MenuView view, @Nullable boolean enabled) {
        view.setDropdownMenuMode(enabled);
    }

    @androidx.annotation.Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onPress", MapBuilder.of("registrationName", "onPress"))
                .put("onCancel", MapBuilder.of("registrationName", "onCancel"))
                .build();
    }
}
